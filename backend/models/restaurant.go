package models

type Restaurant struct {
	Name string  `JSON:"name"`
	Lat  float64 `JSON:"lat"`
	Lng  float64 `JSON:"lng"`
}
