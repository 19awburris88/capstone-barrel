const client = require('./db/client');

const seed = async () => {
  try {
    // Clear existing data (respect foreign key order)
    await client.query(`DELETE FROM products;`);
    await client.query(`DELETE FROM users;`);

    // Insert users (sellers)
    await client.query(`
     INSERT INTO users (id, name, location, bio, avatar_url) VALUES
      (1, 'Bryce Rivers', 'Louisville, KY', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=bryce1'),
      (2, 'Bryce White', 'Dallas, TX', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=bryce2'),
      (3, 'Courtney Hill', 'New York, NY', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=courtney3'),
      (4, 'Erica Walker', 'Chicago, IL', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=erica4'),
      (5, 'Carlos White', 'Atlanta, GA', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=carlos5'),
      (6, 'Bryce Burris', 'Denver, CO', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=bryce6'),
      (7, 'Isaiah Rivers', 'Dallas, TX', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=isaiah7'),
      (8, 'Bryce James', 'Dallas, TX', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=bryce8'),
      (9, 'Courtney White', 'Atlanta, GA', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=courtney9'),
      (10, 'Malik Walker', 'Nashville, TN', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=malik10'),
      (11, 'Isaiah White', 'Chicago, IL', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=isaiah11'),
      (12, 'Courtney James', 'Chicago, IL', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=courtney12'),
      (13, 'Aaliyah White', 'Dallas, TX', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=aaliyah13'),
      (14, 'Bryce Rivers', 'Denver, CO', 'Lover of allocated bourbon and good trades.', 'https://i.pravatar.cc/150?u=bryce14'),
      (15, 'Isaiah Burris', 'Atlanta, GA', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=isaiah15'),
      (16, 'Austin Anderson', 'Dallas, TX', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=austin16'),
      (17, 'Morgan Rivers', 'Denver, CO', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=morgan17'),
      (18, 'Xavier Jackson', 'Dallas, TX', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=xavier18'),
      (19, 'Kendra Hill', 'Dallas, TX', 'Lover of cask strength bourbon and good trades.', 'https://i.pravatar.cc/150?u=kendra19'),
      (20, 'Brandi Anderson', 'New York, NY', 'Lover of rare bourbon and good trades.', 'https://i.pravatar.cc/150?u=brandi20');
    `);

    // ✅ Reset auto-increment counter
    await client.query(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`);

    // Insert bottles (products)
    await client.query(`
    INSERT INTO products (name, price, proof, image, seller_id) VALUES
('Colonel E.H. Taylor Four Grain', '$168', '118.5 Proof', 'https://via.placeholder.com/300x400?text=Colonel+E.H.+Taylor+Four+Grain', 10),
('Barrell Bourbon Dovetail', '$1398', '100.1 Proof', 'https://via.placeholder.com/300x400?text=Barrell+Bourbon+Dovetail', 2),
('Smoke Wagon Uncut Unfiltered', '$201', '117.1 Proof', 'https://via.placeholder.com/300x400?text=Smoke+Wagon+Uncut+Unfiltered', 2),
('Michter’s Celebration', '$1452', '92.3 Proof', 'https://via.placeholder.com/300x400?text=Michter’s+Celebration', 5),
('Stagg Jr.', '$982', '106.7 Proof', 'https://via.placeholder.com/300x400?text=Stagg+Jr.', 9),
('Booker’s 30th Anniversary', '$742', '125.4 Proof', 'https://via.placeholder.com/300x400?text=Booker’s+30th+Anniversary', 8),
('Jefferson’s Presidential Select', '$1491', '132.4 Proof', 'https://via.placeholder.com/300x400?text=Jefferson’s+Presidential+Select', 2),
('Pappy Van Winkle 15', '$500', '105.6 Proof', 'https://via.placeholder.com/300x400?text=Pappy+Van+Winkle+15', 11),
('Booker’s 30th Anniversary', '$1393', '131.9 Proof', 'https://via.placeholder.com/300x400?text=Booker’s+30th+Anniversary', 7),
('Barrell Bourbon Dovetail', '$1343', '122.2 Proof', 'https://via.placeholder.com/300x400?text=Barrell+Bourbon+Dovetail', 11),
('Pappy Van Winkle 20', '$980', '129.1 Proof', 'https://via.placeholder.com/300x400?text=Pappy+Van+Winkle+20', 16),
('Wild Turkey Master’s Keep', '$1012', '138.2 Proof', 'https://via.placeholder.com/300x400?text=Wild+Turkey+Master’s+Keep', 7),
('Russell’s Reserve 13 Year', '$327', '109.2 Proof', 'https://via.placeholder.com/300x400?text=Russell’s+Reserve+13+Year', 7),
('Old Forester Birthday Bourbon', '$1390', '135.6 Proof', 'https://via.placeholder.com/300x400?text=Old+Forester+Birthday+Bourbon', 17),
('Heaven Hill 17 Year', '$744', '102.6 Proof', 'https://via.placeholder.com/300x400?text=Heaven+Hill+17+Year', 20),
('Jack Daniel’s Coy Hill', '$1388', '98.5 Proof', 'https://via.placeholder.com/300x400?text=Jack+Daniel’s+Coy+Hill', 1),
('King of Kentucky', '$759', '112.1 Proof', 'https://via.placeholder.com/300x400?text=King+of+Kentucky', 4),
('Colonel E.H. Taylor Four Grain', '$237', '122.9 Proof', 'https://via.placeholder.com/300x400?text=Colonel+E.H.+Taylor+Four+Grain', 2),
('Barrell Bourbon Dovetail', '$787', '129.8 Proof', 'https://via.placeholder.com/300x400?text=Barrell+Bourbon+Dovetail', 10),
('Parker’s Heritage Collection', '$509', '91.4 Proof', 'https://via.placeholder.com/300x400?text=Parker’s+Heritage+Collection', 10),
('Stagg Jr.', '$241', '109.3 Proof', 'https://via.placeholder.com/300x400?text=Stagg+Jr.', 11),
('George T. Stagg', '$1106', '121.2 Proof', 'https://via.placeholder.com/300x400?text=George+T.+Stagg', 18),
('Four Roses Limited Edition', '$874', '108.5 Proof', 'https://via.placeholder.com/300x400?text=Four+Roses+Limited+Edition', 10),
('Pappy Van Winkle 15', '$670', '119.2 Proof', 'https://via.placeholder.com/300x400?text=Pappy+Van+Winkle+15', 9),
('Eagle Rare 17 Year', '$1431', '105.2 Proof', 'https://via.placeholder.com/300x400?text=Eagle+Rare+17+Year', 5),
('Jefferson’s Presidential Select', '$1195', '131.4 Proof', 'https://via.placeholder.com/300x400?text=Jefferson’s+Presidential+Select', 18),
('Jack Daniel’s Coy Hill', '$228', '135.6 Proof', 'https://via.placeholder.com/300x400?text=Jack+Daniel’s+Coy+Hill', 11),
('Old Forester Birthday Bourbon', '$545', '93.5 Proof', 'https://via.placeholder.com/300x400?text=Old+Forester+Birthday+Bourbon', 10),
('Thomas H. Handy Sazerac', '$1272', '114.8 Proof', 'https://via.placeholder.com/300x400?text=Thomas+H.+Handy+Sazerac', 16),
('Baker’s 13 Year', '$709', '99.9 Proof', 'https://via.placeholder.com/300x400?text=Baker’s+13+Year', 5),
('Jefferson’s Presidential Select', '$889', '99.1 Proof', 'https://via.placeholder.com/300x400?text=Jefferson’s+Presidential+Select', 11),
('Garrison Brothers Cowboy', '$1253', '137.6 Proof', 'https://via.placeholder.com/300x400?text=Garrison+Brothers+Cowboy', 12),
('Yellowstone Limited Edition', '$1245', '126.2 Proof', 'https://via.placeholder.com/300x400?text=Yellowstone+Limited+Edition', 15),
('Weller CYPB', '$840', '100.0 Proof', 'https://via.placeholder.com/300x400?text=Weller+CYPB', 1),
('Old Carter Bourbon', '$950', '113.7 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+Bourbon', 2),
('Heaven Hill 17 Year', '$1456', '104.8 Proof', 'https://via.placeholder.com/300x400?text=Heaven+Hill+17+Year', 20),
('Stagg Jr.', '$748', '108.0 Proof', 'https://via.placeholder.com/300x400?text=Stagg+Jr.', 6),
('Bardstown Discovery Series', '$296', '98.6 Proof', 'https://via.placeholder.com/300x400?text=Bardstown+Discovery+Series', 7),
('Angel’s Envy Cask Strength', '$1454', '91.1 Proof', 'https://via.placeholder.com/300x400?text=Angel’s+Envy+Cask+Strength', 9),
('Heaven Hill 17 Year', '$955', '114.2 Proof', 'https://via.placeholder.com/300x400?text=Heaven+Hill+17+Year', 13),
('Michter’s 10 Year', '$1286', '92.4 Proof', 'https://via.placeholder.com/300x400?text=Michter’s+10+Year', 18),
('Calumet Farm 16', '$1412', '137.6 Proof', 'https://via.placeholder.com/300x400?text=Calumet+Farm+16', 3),
('Old Forester Birthday Bourbon', '$982', '129.3 Proof', 'https://via.placeholder.com/300x400?text=Old+Forester+Birthday+Bourbon', 5),
('Elmer T. Lee', '$1041', '114.4 Proof', 'https://via.placeholder.com/300x400?text=Elmer+T.+Lee', 7),
('Penelope Architect', '$946', '113.0 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Architect', 3),
('Old Forester Birthday Bourbon', '$1388', '94.3 Proof', 'https://via.placeholder.com/300x400?text=Old+Forester+Birthday+Bourbon', 8),
('Booker’s 30th Anniversary', '$165', '119.6 Proof', 'https://via.placeholder.com/300x400?text=Booker’s+30th+Anniversary', 7),
('Booker’s 30th Anniversary', '$1464', '136.8 Proof', 'https://via.placeholder.com/300x400?text=Booker’s+30th+Anniversary', 19),
('Barrell Bourbon Dovetail', '$1307', '133.0 Proof', 'https://via.placeholder.com/300x400?text=Barrell+Bourbon+Dovetail', 9),
('Jack Daniel’s Coy Hill', '$482', '127.9 Proof', 'https://via.placeholder.com/300x400?text=Jack+Daniel’s+Coy+Hill', 12);
INSERT INTO products (name, price, proof, image, seller_id) VALUES
('Remus Repeal Reserve', '$661', '119.3 Proof', 'https://via.placeholder.com/300x400?text=Remus+Repeal+Reserve', 4),
('Blanton’s Gold', '$1355', '131.1 Proof', 'https://via.placeholder.com/300x400?text=Blanton’s+Gold', 18),
('Knob Creek 18 Year', '$1207', '113.1 Proof', 'https://via.placeholder.com/300x400?text=Knob+Creek+18+Year', 3),
('Rare Perfection 15', '$278', '116.9 Proof', 'https://via.placeholder.com/300x400?text=Rare+Perfection+15', 8),
('Wild Turkey Master’s Keep', '$862', '99.4 Proof', 'https://via.placeholder.com/300x400?text=Wild+Turkey+Master’s+Keep', 12),
('Colonel E.H. Taylor Four Grain', '$1152', '99.7 Proof', 'https://via.placeholder.com/300x400?text=Colonel+E.H.+Taylor+Four+Grain', 1),
('Blanton’s Straight From the Barrel', '$782', '124.1 Proof', 'https://via.placeholder.com/300x400?text=Blanton’s+Straight+From+the+Barrel', 20),
('Rock Hill Farms', '$804', '98.0 Proof', 'https://via.placeholder.com/300x400?text=Rock+Hill+Farms', 19),
('Jefferson’s Presidential Select', '$1346', '102.8 Proof', 'https://via.placeholder.com/300x400?text=Jefferson’s+Presidential+Select', 3),
('William Larue Weller', '$749', '106.6 Proof', 'https://via.placeholder.com/300x400?text=William+Larue+Weller', 1),
('Blanton’s Gold', '$1049', '96.8 Proof', 'https://via.placeholder.com/300x400?text=Blanton’s+Gold', 20),
('Four Roses Limited Edition', '$1135', '135.2 Proof', 'https://via.placeholder.com/300x400?text=Four+Roses+Limited+Edition', 15),
('Willett Family Reserve', '$761', '131.0 Proof', 'https://via.placeholder.com/300x400?text=Willett+Family+Reserve', 11),
('Old Carter Rye Batch 7', '$310', '114.6 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+Rye+Batch+7', 3),
('Old Carter Bourbon Batch 12', '$299', '117.3 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+Bourbon+Batch+12', 3),
('Old Carter American Whiskey Batch 5', '$325', '138.9 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+American+Whiskey+Batch+5', 3),
('Old Carter Bourbon Batch 14', '$310', '115.2 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+Bourbon+Batch+14', 3),
('Old Carter Rye Batch 8', '$289', '112.4 Proof', 'https://via.placeholder.com/300x400?text=Old+Carter+Rye+Batch+8', 3),
('Penelope Architect Build 4', '$79', '104 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Architect+Build+4', 5),
('Penelope Barrel Strength Batch 13', '$64', '115.6 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Barrel+Strength+Batch+13', 5),
('Penelope Rosé Cask Finish', '$69', '94 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Rose+Cask+Finish', 5),
('Penelope Toasted Barrel Strength', '$74', '116.2 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Toasted+Barrel+Strength', 5),
('Penelope Valencia Cask Finish', '$76', '96 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Valencia+Cask+Finish', 5),
('Penelope Four Grain Bourbon', '$59', '80 Proof', 'https://via.placeholder.com/300x400?text=Penelope+Four+Grain+Bourbon', 5),
('Four Gate Foundation Batch 1', '$185', '120.2 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+Foundation+Batch+1', 6),
('Four Gate Split Stave', '$198', '117.4 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+Split+Stave', 6),
('Four Gate Kelvin Collab V', '$214', '123.7 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+Kelvin+Collab+V', 6),
('Four Gate Port Perry Perry', '$205', '115.6 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+Port+Perry+Perry', 6),
('Four Gate The Kelvin Sixty', '$225', '121.9 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+The+Kelvin+Sixty', 6),
('Four Gate Andalusia Key', '$229', '114.4 Proof', 'https://via.placeholder.com/300x400?text=Four+Gate+Andalusia+Key', 6),
('Rare Character Bourbon Sherry Finish', '$159', '116.1 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+Bourbon+Sherry+Finish', 7),
('Rare Character Rye Cognac Finish', '$169', '118.7 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+Rye+Cognac+Finish', 7),
('Rare Character Bourbon Single Barrel', '$175', '115.2 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+Bourbon+Single+Barrel', 7),
('Rare Character Tequila Finish Bourbon', '$160', '112 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+Tequila+Finish+Bourbon', 7),
('Rare Character High-Rye Bourbon', '$158', '113.6 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+High+Rye+Bourbon', 7),
('Rare Character Mizunara Cask Bourbon', '$195', '114.5 Proof', 'https://via.placeholder.com/300x400?text=Rare+Character+Mizunara+Cask+Bourbon', 7),
('Still Austin Cask Strength', '$64', '118 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+Cask+Strength', 8),
('Still Austin “The Musician”', '$48', '98.4 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+The+Musician', 8),
('Still Austin “The Artist” Rye', '$52', '99.6 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+The+Artist+Rye', 8),
('Still Austin Bottled in Bond', '$69', '100 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+Bottled+in+Bond', 8),
('Still Austin Cognac Cask Finish', '$77', '115.7 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+Cognac+Cask+Finish', 8),
('Still Austin Barrel Proof SB', '$84', '123.2 Proof', 'https://via.placeholder.com/300x400?text=Still+Austin+Barrel+Proof+SB', 8);


    `);

    console.log('🌱 Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error during seed:', err);
    process.exit(1);
  }
};

seed();
