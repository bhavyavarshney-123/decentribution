package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/gorilla/handlers"
	"io/ioutil"
	"net/http"

	log "github.com/sirupsen/logrus"

	"github.com/gorilla/mux"
)

type SendBody struct {
	SendTo   string  `json:"sendto"`
	SendFrom string  `json:"sendfrom"`
	Amount   float64 `json:"amount"`
}

const (
	URL  = "http://localhost:5000/_jsonrpc"
	PORT = ":3000"
)

func getBlockchain(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	var jsonStr = []byte(`{
		"id": 1,
		"method": "API.GetBlockchain", 
		"params": []
	}`)
	req, err := http.NewRequest("POST", URL, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	log.Info("response Status:", resp.Status)
	log.Info("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	log.Info("response Body:", string(body))

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(body)
	if err != nil {
		log.Errorf("Failed to write the response body: %v", err)
		return
	}
}

func getBalance(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	vars := mux.Vars(r)
	byt := fmt.Sprintf(`{
		"id": 1,
		"method": "API.GetBalance", 
		"params": [{"Address": "%s"}]
	}`, vars["address"])

	var jsonStr = []byte(byt)
	req, err := http.NewRequest("POST", URL, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	log.Info("response Status:", resp.Status)
	log.Info("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	log.Info("response Body:", string(body))

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(body)
	if err != nil {
		log.Errorf("Failed to write the response body: %v", err)
		return
	}
}

func send(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	var respBody SendBody
	err := json.NewDecoder(r.Body).Decode(&respBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println(respBody)
	byt := fmt.Sprintf(`{"id": 1 , "method": "API.Send", "params": [{"sendFrom":"%s","sendTo": "%s", "amount": %f}]}`, respBody.SendFrom, respBody.SendTo, respBody.Amount)
	var jsonStr = []byte(byt)
	req, err := http.NewRequest("POST", URL, bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	log.Info("response Status:", resp.Status)
	log.Info("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	log.Info("response Body:", string(body))

	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write(body)
	if err != nil {
		log.Errorf("Failed to write the response body: %v", err)
		return
	}
}

func setupCorsResponse(w *http.ResponseWriter, r *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")

	// Handle preflight requests
	if r.Method == http.MethodOptions {
		(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
		(*w).WriteHeader(http.StatusNoContent)
		return
	}
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/getblockchain", getBlockchain).Methods("GET")
	router.HandleFunc("/getbalance/{address}", getBalance).Methods("GET")
	router.HandleFunc("/send", send).Methods("POST")

	//Use CORS middleware
	cors := handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"*"}),
	)

	log.Info("Listening on port " + PORT)
	log.Fatalln(http.ListenAndServe(PORT, cors(router)))
}
