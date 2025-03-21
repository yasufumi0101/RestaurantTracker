package dto

type RegistrateInput struct {
	Name      string  `json:"name" binding:"required"`
	Lat       float64 `json:"lat" binding:"required"`
	Lng       float64 `json:"lng" binding:"required"`
	Rating    float64 `json:"rating" binding:"required"`
	Memo      string  `json:"memo"`
	VisitedAt string  `json:"visited_at" binding:"required"`
}
