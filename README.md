# Dark Teacher Evaluations
Assignment 3 in Web Programming II - Teacher evaluation app

## How to run
To run the website make sure you have npm installed.

See [NPM GitHub Repo](https://github.com/npm/npm) for details.

Execute the following command in the root of the project.
```
./init
```

To run the project execute the following command.
```
./startClient
```
You should now be able to open the website at the following URL

[http://localhost:8000/src/html](http://localhost:8000/src/html)

## Some bugs.
* The evaluations results page shows the same teachers' questions for every course.
 - The issue is that we get the teachers from a course from the server but we haven't got the results when we try to get the next set of teachers.