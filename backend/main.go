package main

import (
	"backend/controllers"
	"backend/infra"
	"backend/repositories"
	"backend/services"

	"github.com/gin-gonic/gin"
)

func main() {
	infra.Initialize()
	db := infra.SetupDB()

	authRepository := repositories.NewAuthRepository(db)
	authService := services.NewAuthService(authRepository)
	authController := controllers.NewAuthContoller(authService)

	r := gin.Default()
	authRouter := r.Group("/auth")

	authRouter.POST("/signup", authController.Signup)
	authRouter.POST("/login", authController.Login) // ここのimport部分は再度チェックする必要がある

	r.Run(":8080")
}
