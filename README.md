# Welcome!

This is my solo project application which makes extensive use of React and Redux to achieve its goal of cloning some of the functionality of
AirBnB.  My version is called "Air D&D" (airdandd in the online deployment).

# Getting Started

If you'd like to run this application locally you'll have to do the following.

1. ``NPM install`` inside both the frontend and backend folders.
2. After that use a terminal to enter psql and type ``psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"`` with a ``<username>`` and a ``<password>``
of your choice.
3. Next navigate to your backend folder in your terminal and and type ``npx dotenv sequelize db:create`` to create your DB.
4. After that you'll need to set up your .ENV file in the backend according to the ``ENV.example`` file and put the ``<username>`` and the ``<password>`` that you chose when you made the user in PSQL.
5. Be aware that you'll need to generate a JWT_SECRET to put into the .ENV. You can use ``openssl rand -base64 10`` to create a new secret.
6. After that you'll need to run the migrations with ``NPX dotenv sequelize DB:MIGRATE``.
7. You'll need to run the seeder after that with ``NPX dotenv sequelize DB:SEED:ALL``.
8. Once you're seeded navigate a terminal to the /backend folder and type ``NPM start`` to start the server.
9. After you backend server has started open another terminal window to the /frontend folder and type ``NPM start`` to start the server.
10. This will generally open a browser window, but in case it doesn't you can navigate a window to ``http://localhost:3000/``

You should be able to browse the site after this.
