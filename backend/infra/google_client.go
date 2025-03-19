package infra

import (
	"log"
	"os"

	"googlemaps.github.io/maps"
)

func NewGoogleClient() *maps.Client {
	apikey := os.Getenv("GOOGLE_MAPS_API_KEY")
	client, err := maps.NewClient(maps.WithAPIKey(apikey))
	if err != nil {
		log.Fatal("Failed to create Google Maps client")
		return nil
	}
	return client
}
