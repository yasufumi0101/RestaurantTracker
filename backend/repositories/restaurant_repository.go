package repositories

import (
	"backend/models"

	"gorm.io/gorm"
)

type IRestaurantRepository interface {
	CreateRestaurant(restaurant models.Restaurant) error
	FindRecentThreeRestaurants(userID uint) ([]models.Restaurant, error)
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

func (r *RestaurantRepository) FindRecentThreeRestaurants(userID uint) ([]models.Restaurant, error) {
	var restaurants []models.Restaurant

	err := r.db.Where("user_id = ?", userID).Order("visited_at desc").Limit(3).Find(&restaurants).Error
	if err != nil {
		return nil, err
	}

	return restaurants, nil
}
