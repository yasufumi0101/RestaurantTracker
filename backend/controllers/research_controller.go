package controllers

import (
	"backend/dto"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type IResearchController interface {
	SearchRestaurant(ctx *gin.Context)
}

type ResearchController struct {
	service services.IResearchService
}

func NewResearchController(service services.IResearchService) IResearchController {
	return &ResearchController{service: service}
}

func (c *ResearchController) SearchRestaurant(ctx *gin.Context) {
	var input dto.SearchRestaurantInput

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	restaurant, err := c.service.SearchRestaurant(input.Query)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, restaurant)
}
