# Welcome!

This is my solo project application which makes extensive use of React and Redux to achieve its goal of cloning some of the functionality of
AirBnB.  My version is called "Air D&D" (airdandd in the online deployment).

# Getting Started

If you'd like to run this application locally you'll have to do the following.

1. ``NPM install`` inside both the frontend and backend folders.
2. After that you'll need to run the migrations with ``NPX DOTENV sequelize DB:MIGRATE``.
3. You'll need to run the seeder after that with ``NPX DOTENV sequelize DB:SEED:ALL``.
4. Once you're seeded navigate a terminal to the /backend folder and type ``NPM start`` to start the server.
5. After you backend server has started open another terminal window to the /frontend folder and type ``NPM start`` to start the server.
6. This will generally open a browser window, but in case it doesn't you can navigate a window to ``http://localhost:3000/``

You should be able to browse the site after this.
