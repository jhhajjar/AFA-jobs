package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type job struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	Author       string `json:"author"`
	Location     string `json:"location"`
	ContactEmail string `json:"contact_email"`
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func setupDB() *sql.DB {
	dbinfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", DB_IP, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)

	checkErr(err)

	return db
}

// / This function should list all of the jobs available
// Later additions:
// - zip code
// - expertise
func getAllJobs(c *gin.Context) {
	fmt.Println("we here?")
	var sqlq string = `
		SELECT id, title, description, author, location, contact_email
		FROM jobs
	`

	var db *sql.DB = setupDB()
	rows, err := db.Query(sqlq)
	checkErr(err)

	var allJobs []job
	for rows.Next() {
		var id int
		var title, description, author, location, contact_email string

		err = rows.Scan(&id, &title, &description, &author, &location, &contact_email)
		checkErr(err)

		allJobs = append(allJobs, job{
			ID:           id,
			Title:        title,
			Description:  description,
			Author:       author,
			Location:     location,
			ContactEmail: contact_email,
		})
	}

	c.JSON(http.StatusOK, allJobs)
}

// Gets a specific job based on ID
func retrieveJob(c *gin.Context) {
	var sqlq string = `
		SELECT id, title, description, author, location, contact_email
		FROM jobs
		WHERE id = $1
	`

	var job_id string = c.Param("jobid")

	var db *sql.DB = setupDB()
	row := db.QueryRow(sqlq, job_id)

	var id int
	var title, description, author, location, contact_email string

	err := row.Scan(&id, &title, &description, &author, &location, &contact_email)
	switch err {
	case sql.ErrNoRows:
		fmt.Println("No Rows found")
		c.JSON(http.StatusNotFound, "404 JOB NOT FOUND")
	case nil:
		var job job = job{
			ID:           id,
			Title:        title,
			Description:  description,
			Author:       author,
			Location:     location,
			ContactEmail: contact_email,
		}

		c.JSON(http.StatusOK, job)
	default:
		checkErr(err)
	}
}

// / This function should create a job and send to database
// Jobs have:
// - title
// - description
// - author
// - location
// - contact
func createJob(c *gin.Context) {
	var newJob job
	err := c.BindJSON(&newJob)
	checkErr(err)

	var sqlq string = `
		INSERT INTO jobs (title, description, author, location, contact_email)
		VALUES ($1, $2, $3, $4, $5)`

	var db *sql.DB = setupDB()
	_, err = db.Exec(sqlq, newJob.Title, newJob.Description, newJob.Author, newJob.Location, newJob.ContactEmail)
	checkErr(err)

	c.JSON(http.StatusCreated, "Successfully created new job")
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/allJobs", getAllJobs)
	router.GET("/job/:jobid", retrieveJob)
	router.POST("/createJob", createJob)

	host := "localhost"
	port := 8080
	server := fmt.Sprintf("%s:%d", host, port)
	fmt.Println("Listening on", server)
	http.ListenAndServe(server, router)
}
