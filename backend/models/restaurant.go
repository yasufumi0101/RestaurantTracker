package models

import (
	"time"

	"gorm.io/gorm"
)

type Restaurant struct {
	gorm.Model
	UserID    uint    `gorm:"not null"`
	Name      string  `gorm:"not null;unique"`
	Lat       float64 `gorm:"not null"`
	Lng       float64 `gorm:"not null"`
	Rating    float64 `gorm:"not null"`
	Memo      string
	VisitedAt time.Time `gorm:"not null"`
}
