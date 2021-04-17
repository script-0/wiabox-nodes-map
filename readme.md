# Map as a Service for wiabox
Maps of Nodes and communities of Wiabox 
## Requirements
As it's a Node Project, you need :
  * **NodeJs 10+ And Npm 6+**
  * **MySql / Postgres / MySql** for database

## How can install
1. Clone the project and Move to the project folder :

```bash
$ git clone https://github.com/script-0/wiabox-nodes-map.git
$ cd wiabox-nodes-map
```

2. Install all required package
```bash
$ npm install
```

3. Define environment variables : 
    - create .env file
    ```bash
    $ nano .env
    ```

    - Add the following lines and update it as you like

    ```
    DB_HOST=localhost
    DB_USER=wiabox
    DB_PASSWORD=wiabox
    DB_DATABASE=wiabox_nodes
    DB_PORT=3307


    TOKEN_SECRET=@WiaboxMapASapiTOKEN
    #Token expiration delay : 1h = 1*60*60
    TOKEN_DELAY=3600
    TOKEN_INVALID=Invalid token
    TOKEN_GENERATION_FAILED =Token Generation Failed

    PORT_LISTEN = 3001
    ```

4. Import Database
    - edit `database/init_db.sql` : At the ends ( when creating DB user and password ) modify `username` and `pasword` and set they values that you are put on .env ( `DB_USER` , `DB_PASSWORD`)

    - import into MySQL
    ```bash
        $ mysql -u <root_user> -p<root_password> <  init_db.sql
    ```

5. All done. Run the project
    ```bash
        $ npm start
    ```
    Project is running at ` http://127.0.0.1:<PORT_LISTER>/`

## Making tests
- Open files on `routes/` , they are well documented. 
- `tests` contain some tests already done and future work

## Future works

- [ ] Integrate UI
- [ ] Revoke working token when platform updating
- [ ] Make more test

## Credits
Built in the frame of **Projet réseau 4GI : Design and Implement website of Wiabox ( a community netwoek)**