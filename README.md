# alecktos-trading-statistics

A react application with an PHP backend for viewing trading charts. 

It's using three docker containers; A PHP, node and a nginx proxying the data. 
 
## Dev
    Run dev environment: docker-compose up [--force-recreate]
Go to 0.0.0.0 for accessing your environment
### Misc
Run frontend dev application: npm run dev

Build docker: docker-compose build
 
## Prod
Run prod environment: docker-compose up -d
 
