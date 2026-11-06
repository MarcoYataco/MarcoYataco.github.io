resource "google_storage_bucket" "terraform_state" {
  name                        = "tf-bucket-846696"
  project                     = var.project_id
  location                    = "US"
  force_destroy               = true
  uniform_bucket_level_access = true
}
