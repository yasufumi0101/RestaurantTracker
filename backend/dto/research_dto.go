package dto

type SearchRestaurantInput struct {
	Query string `json:"query" binding:"required"`
}

type SearchRestaurantOutput struct {
	Success  bool   `json:"success"`
	Name     string `json:"name"`
	Location struct {
		Lat float64 `json:"lat"`
		Lng float64 `json:"lng"`
	}
}
