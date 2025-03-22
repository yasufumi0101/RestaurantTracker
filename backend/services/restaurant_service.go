package services

import (
	"backend/dto"
	"backend/models"
	"backend/repositories"
	"time"
)

type IRestaurantService interface {
	RegisterRestaurant(input dto.RegistrateInput, userID uint, visitedAt time.Time) error
	GetRecentThreeRestaurants(userID uint) ([]models.Restaurant, error)
}

type RestaurantService struct {
	repository repositories.IRestaurantRepository
}

func NewRestaurantService(repository repositories.IRestaurantRepository) IRestaurantService {
	return &RestaurantService{repository: repository}
}

func (s *RestaurantService) RegisterRestaurant(input dto.RegistrateInput, userID uint, visitedAt time.Time) error {
	restaurant := models.Restaurant{
		UserID:    userID,
		Name:      input.Name,
		Lat:       input.Lat,
		Lng:       input.Lng,
		Rating:    input.Rating,
		Memo:      input.Memo,
		VisitedAt: visitedAt,
	}

	return s.repository.CreateRestaurant(restaurant)
}

func (s *RestaurantService) GetRecentThreeRestaurants(userID uint) ([]models.Restaurant, error) {
	return s.repository.FindRecentThreeRestaurants(userID)
}
