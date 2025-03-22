package main

import (
	"backend/controllers"
	"backend/infra"
	"backend/middlewares"
	"backend/repositories"
	"backend/services"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	infra.Initialize()
	db := infra.SetupDB()

	// 依存性の注入
	authRepository := repositories.NewAuthRepository(db)
	authService := services.NewAuthService(authRepository)
	authController := controllers.NewAuthContoller(authService)

	googleClient := infra.NewGoogleClient()
	researchService := services.NewResearchService(googleClient)
	researchController := controllers.NewResearchController(researchService)

	restaurantRepository := repositories.NewRestaurantRepository(db)
	restaurantService := services.NewRestaurantService(restaurantRepository)
	restaurantController := controllers.NewRestaurantController(restaurantService)

	r := gin.Default()

	// CORS ミドルウェアの設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // フロントエンドのURLを明示的に許可
		AllowMethods:     []string{"GET", "POST", "PUT"},
		AllowHeaders:     []string{"Authorization", "Content-Type"},
		ExposeHeaders:    []string{"Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour, // プリフライトリクエストをキャッシュ
	}))

	// 認証のいらないエンドポイント
	authRouter := r.Group("/auth")
	authRouter.POST("/signup", authController.Signup)
	authRouter.POST("/login", authController.Login)

	r.POST("/search", researchController.SearchRestaurant)

	// 認証の必要なエンドポイント
	protectedRouter := r.Group("/")
	protectedRouter.Use(middlewares.AuthMiddleware(authService))

	// ユーザー情報の取得
	protectedRouter.GET("/auth/validate", func(ctx *gin.Context) {
		user, exists := ctx.Get("user")
		if !exists {
			ctx.JSON(http.StatusUnauthorized, gin.H{"valid": false})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"valid": true, "user": user})
	})

	// レストラン情報の登録
	protectedRouter.POST("/registrations/restaurant", restaurantController.Register)
	protectedRouter.GET("/restaurants/recent", restaurantController.GetRecentThreeRestaurants)

	r.Run(":8080")
}
