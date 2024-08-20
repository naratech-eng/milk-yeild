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
mongo <- mongo(collection = mongo_collection, db =mongo_db, url = mongo_url)

tryCatch({
  count <- mongo$count()
  cat("Successfully connected to the MongoDB database. Document count:", count, "\n")
}, error = function(e) {
  cat("Failed to connect to MongoDB. Error:", e$message, "\n")
  stop("Exiting script due to MongoDB connection failure.")
})

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
api$handle("GET", "/api/milking/", function() {
  milking_data <- mongo$find('{}', fields =  '{"_id": 1, "Milking Number": 1, "Duration (mm:ss)": 1, "Yield (kg)": 1, "OCC (*1000 cells/ml)": 1, "Milking Interval (hh:mm)": 1, "LF": 1, "RF": 1, "LR": 1, "RR": 1, "Udder": 1, "Milk Destination": 1}')
  return(milking_data)
})

# Create new milking data
#* @post /milking
api$handle("POST", "/api/milking/", function(req) {
  new_milking_data <- jsonlite::fromJSON(req$postBody)
  mongo$insert(new_milking_data)
  return(new_milking_data)
})

# Edit existing milking data
#* @put /api/milking/<id>
api$handle("PUT","/api/milking/<id>", function(req) {
  id <- req$args$id
  updated_milking_data <- jsonlite::fromJSON(req$postBody)
  mongo$update(query = paste0('{"_id":{"$oid":"', id, '"}}'), update = paste0('{"$set":', jsonlite::toJSON(updated_milking_data), '}'))
  return(updated_milking_data)
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
