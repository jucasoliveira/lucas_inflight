# Technical Assessment Inflight Dublin 
The purpose of the given tasks is not only to gauge your technical ability, but to see how you  think through an engineering solution. We will talk through your results and your logic as part of  your technical interview. The tasks will not make or break your candidacy for the role but serve  as a single data-point among your other excellent qualifications.

## Please complete following tasks

1. Backend Task using NodeJS:
    1. Develop API's to store, retrieve, update & delete Flight Details.
2. Database Task using any Relational/Non-Relational database for your choice: 
    1. Table to store Flight Details like Flight Code, Service Provider, Source, Destination, Scheduled  Departure & Arrival Time. PFB sample object:
    ```
    { 
    id: string,
    flightCode: string,
    flightProvider: string,
    sourcePortName: string,
    sourcePortCode: string,
    destinationPortName: string,
    destinationPortCode: string,
    scheduledArrival: date,
    scheduledDeparture: date
    status: 'LANDED' | 'ON SCHEDULE' | 'DELAYED'
    }
    ```

3. Frontend Task using ReactJS: 
    1. Develop UI to show, delete Flight Details. 
    2. Develop UI to show a modal when clicked on more details listing the current flight details and  allows to select a status of the flight from drop down and update the same calling an api in the  backend.

Try and implement the UI as below. Don’t need to bother about different viewport you can focus  on a desktop view port.
The view need not be pixel perfect.
> No need of Redux.
> Try and adhere to React principles and best practices.

### Bonus Points:

1. Dockerize the app.
2. Use Mongo Database.
3. Use Material UI.
Once you’re done with the above tasks, please create a GIT bundle &  share it with us.
```git bundle create YOUR_NAME_IFD master```

> Make sure that all your commits are preserved in the bundle with the history.
