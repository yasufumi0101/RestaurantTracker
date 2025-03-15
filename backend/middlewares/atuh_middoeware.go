package middlewares

import (
	"backend/services"
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(authService services.IAuthService) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Authorizationヘッダーの取得
		header := ctx.GetHeader("Authorization")
		if header == "" {
			// abort関数により、以降の処理を中断し、指定したステータスコードを返す
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		if !strings.HasPrefix(header, "Bearer ") {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Bearer トークンの取得
		tokenString := strings.TrimPrefix(header, "Bearer ")
		user, err := authService.GetUserFromToken(tokenString)
		if err != nil {
			fmt.Println("Error in GetUserFromToken:", err) // エラー内容をログに出力
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// ユーザー情報をコンテキストにセット
		ctx.Set("user", user)
		ctx.Next()
	}
}
