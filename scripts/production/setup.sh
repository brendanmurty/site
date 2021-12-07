#!/bin/bash

# Install Git and Git LFS
sudo apt install -y git git-lfs
git-lfs install

# Install Apache
sudo apt install -y apache2

# Configure Apache
sudo a2enmod rewrite
sudo a2enmod headers
sudo a2enmod ssl
sudo service apache2 restart
rm /var/www/html/index.html
cp ~/site/scripts/production/.htaccess /var/www/html
sudo cp ~/site/scripts/production/apache.conf /etc/apache2/sites-enabled/000-default.conf
sudo cp ~/site/scripts/production/apache-ssl.conf /etc/apache2/sites-enabled/default_ssl.conf
sudo service apache2 restart

# Build the site in to the "public" directory
bash ~/site/scripts/build.sh

# Copy the "public" files in to the Apache webroot
sudo cp -r ~/site/public/* /var/www/html

# Copy over the ENV file
sudo cp ~/site/.env /var/www/html

# Install Certbot
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
touch /etc/letsencrypt/options-ssl-apache.conf
mkdir -p /etc/letsencrypt/live/www.murty.io/
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Create SSL certificates for the required domains
sudo certbot certonly --apache -d www.murty.io -d murty.io -d brendan.murty.io -d b.murty.io -d freya.murty.io -d f.murty.io -d isla.murty.io -d i.murty.io -d git.murty.io -d gallery.murty.io -d photos.murty.io -d murty.photos -d www.murty.photos -d bmurty.dev -d www.bmurty.dev -d bmurty.blog -d www.bmurty.blog -d brendanmurty.com -d www.brendanmurty.com -d freyamurty.com -d www.freyamurty.com -d islamurty.com -d www.islamurty.com -d lucamurty.com -d www.lucamurty.com -d l.murty.io -d luca.murty.io
