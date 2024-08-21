# Install required packages
if (!requireNamespace("plumber", quietly = TRUE)) {
  install.packages("plumber")
}

if (!requireNamespace("mongolite", quietly = TRUE)) {
  install.packages("mongolite")
}

if (!requireNamespace("dotenv", quietly = TRUE)) {
  install.packages("dotenv")
}

# Load required packages
library(plumber)
library(mongolite)
library(dotenv)

# Load environment variables from the .env file
dotenv::load_dot_env()

# Access the environment variables
mongo_url <- Sys.getenv("MONGO_URL")
mongo_db <- Sys.getenv("MONGO_DB")
mongo_collection <- Sys.getenv("MONGO_COLLECTION")

# Connect to MongoDB
mongo <- mongo(collection = mongo_collection, db = mongo_db, url = mongo_url)

tryCatch({
  count <- mongo$count()
  cat("Successfully connected to the MongoDB database. Document count:", count, "\n")
}, error = function(e) {
  cat("Failed to connect to MongoDB. Error:", e$message, "\n")
  stop("Exiting script due to MongoDB connection failure.")
})
#function to clean data 
remove_single_element_arrays <- function(x) {
  if (is.list(x)) {
    for (name in names(x)) {
      if (is.list(x[[name]])) {
        if (length(x[[name]]) == 1) {
          x[[name]] <- x[[name]][[1]]
        } else {
          x[[name]] <- remove_single_element_arrays(x[[name]])
        }
      }
    }
  }
  return(x)
}



# Create a new plumber router
api <- plumber$new()

# CORS filter to handle preflight requests and add CORS headers
api$filter("cors", function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list(message = "CORS preflight"))
  } else {
    forward()
  }
})

#* @get "/"
api$handle("GET", "/", function() {
  list(message = "Hello, World!!!")
})

# Get all milking data
#* @get /milking
api$handle("GET", "/api/milking", function(req, res) {
  milking_data <- mongo$find(
    '{}', 
    fields =  '{"_id": 1, "Milking Number": 1, "Duration (mm:ss)": 1, "Yield (kg)": 1, "OCC (*1000 cells/ml)": 1, "Milking Interval (hh:mm)": 1, "LF": 1, "RF": 1, "LR": 1, "RR": 1, "Udder": 1, "Milk Destination": 1}'
    )
# Parse JSON string into an R object  
  # data <- jsonlite::fromJSON(milking_data , simplifyVector = FALSE)

  # Process the data to remove single-element arrays
  # data_cleaned <- lapply(milking_data, remove_single_element_arrays)

# Convert the cleaned R object back to JSON
  # cleaned_json_string <- jsonlite::toJSON(data_cleaned, pretty = TRUE, auto_unbox = TRUE)

  # Send the cleaned JSON string as the response
  # res$setHeader("Content-Type", "application/json")
  # res$body <- cleaned_json_string

  return(milking_data)
})

# Create new milking data
#* @post /milking
api$handle("POST", "/api/milking", function(req) {
  mongo$insert(req$postBody)
  return(req$postBody)
})

# Edit existing milking data
#* @put /api/milking/<id>
api$handle("PUT","/api/milking/<id>", function(req) {
  id <- req$args$id
  print(paste("from db: ", req$postBody))
  # updated_milking_data <- jsonlite::fromJSON(req$postBody)
  # mongo$update(query = paste0('{"_id":{"$oid":"', id, '"}}'), update = paste0('{"$set":', jsonlite::toJSON(updated_milking_data), '}'))
  # incoming JSON to R object 
  updated_milking_data <- jsonlite::fromJSON(req$postBody)
  print(paste("Updating data with ID:", id))

    # Remove `_id` if it exists in the updated data
  updated_milking_data$`_id` <- NULL

   # Convert back to JSON string after removing `_id`
  updated_milking_data_json <- jsonlite::toJSON(updated_milking_data, auto_unbox = TRUE)
  
   # Construct MongoDB query and update strings
  query <- sprintf('{"_id": {"$oid": "%s"}}', id)
  update <- sprintf('{"$set": %s}', updated_milking_data_json)
  
  # Perform update operation
  mongo$update(query = query, update = update)

  return(updated_milking_data_json)
})

# Delete milking data
#* @delete api/milking/:id
api$handle("DELETE", "/api/milking/<id>", function(req) {
  id <- req$args$id
  mongo$remove(query = paste0('{"_id":{"$oid":"', id, '"}}'))
  return(list(message = "Milking data deleted successfully"))
})

# Run the API

api$run(port = 5001)
