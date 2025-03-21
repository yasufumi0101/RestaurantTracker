package services

import (
	"backend/dto"
	"context"
	"fmt"

	"googlemaps.github.io/maps"
)

type IResearchService interface {
	SearchRestaurant(query string) (*dto.SearchRestaurantOutput, error)
}

type ResearchService struct {
	Client *maps.Client
}

func NewResearchService(client *maps.Client) IResearchService {
	return &ResearchService{Client: client}
}

func (s *ResearchService) SearchRestaurant(query string) (*dto.SearchRestaurantOutput, error) {
	request := &maps.TextSearchRequest{
		Query:    query,
		Language: "ja",
	}

	// google maps apiを使って検索
	result, err := s.Client.TextSearch(context.Background(), request)
	if err != nil || len(result.Results) == 0 {
		fmt.Println("Google Places API リクエストエラー:", err)
		return nil, fmt.Errorf("failed to search restaurants")
	}

	// 1件目の検索結果を返す
	places := result.Results[0]
	return &dto.SearchRestaurantOutput{
		Success: true,
		Name:    places.Name,
		Location: struct {
			Lat float64 `json:"lat"`
			Lng float64 `json:"lng"`
		}{
			Lat: places.Geometry.Location.Lat,
			Lng: places.Geometry.Location.Lng,
		},
	}, nil
}
