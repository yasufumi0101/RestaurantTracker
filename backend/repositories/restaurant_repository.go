package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type IRestaurantRepository interface {
	CreateRestaurant(restaurant models.Restaurant) error
}

type RestaurantRepository struct {
	db *gorm.DB
}

func NewRestaurantRepository(db *gorm.DB) IRestaurantRepository {
	return &RestaurantRepository{db: db}
}

func (r *RestaurantRepository) CreateRestaurant(restaurant models.Restaurant) error {
	result := r.db.Create(&restaurant)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
