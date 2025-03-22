package models

import (
	"time"

	"gorm.io/gorm"
)

type Restaurant struct {
	gorm.Model
	UserID    uint      `gorm:"not null" json:"user_id"`
	Name      string    `gorm:"not null;unique" json:"name"`
	Lat       float64   `gorm:"not null" json:"lat"`
	Lng       float64   `gorm:"not null" json:"lng"`
	Rating    float64   `gorm:"not null" json:"rating"`
	Memo      string    `json:"memo"`
	VisitedAt time.Time `gorm:"not null" json:"visited_at"`
}
