# alecktos-trading-statistics

A react application with an PHP backend for viewing trading charts. 

It's using three docker containers; A PHP, node and a nginx proxying the data. 
 
## Dev
	dev environment: docker-compose up [--force-recreate]
Go to 0.0.0.0 for accessing your environment

### Example
	http://0.0.0.0/11-05-2017/disney_1_day

### Misc
Run frontend dev application: npm run dev

Build docker: docker-compose build
 
## Prod
Run prod environment: docker-compose up -d
 
## Resources
create a new dir for each stock with a stock file and trades database in each dir.

Example:

	-> resources
	  -> disney
	    -> database.db
	    -> price.txt