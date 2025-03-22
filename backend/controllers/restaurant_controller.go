package controllers

import (
	"backend/dto"
	"backend/models"
	"backend/services"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type IRestaurantController interface {
	Register(ctx *gin.Context)
}

type RestaurantController struct {
	service services.IRestaurantService
}

func NewRestaurantController(service services.IRestaurantService) IRestaurantController {
	return &RestaurantController{service: service}
}

func (c *RestaurantController) Register(ctx *gin.Context) {
	var input dto.RegistrateInput

	// ユーザー側からのJSONデータを型変換
	if err := ctx.ShouldBindBodyWithJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ユーザー情報の取得
	user, exists := ctx.Get("user")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}
	u := user.(*models.User)

	// VisitedAtをパース
	visitedAt, err := time.Parse("2006-01-02", input.VisitedAt)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "VisitedAt is invalid"})
		return
	}

	if err := c.service.RegisterRestaurant(input, u.ID, visitedAt); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"success": true})
}
