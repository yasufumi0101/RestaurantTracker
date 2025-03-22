package main

import (
	"backend/infra"
	"backend/models"
)

func main() {
	infra.Initialize()
	db := infra.SetupDB()

	if err := db.AutoMigrate(&models.User{}, &models.Restaurant{}); err != nil {
		panic("Failed to migrate database")
	}
}
