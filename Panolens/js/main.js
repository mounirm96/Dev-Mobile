

const container = document.querySelector('#container')
const img1 = './img/desert.jpg'
const img2 = './img/mountain.jpg'  
const panorama1 = new PANOLENS.ImagePanorama( img1  );
const panorama2 = new PANOLENS.ImagePanorama( img2  );


const infospot10 = new PANOLENS.Infospot( 250, PANOLENS.DataImage.Info );
infospot10.position.set( -100, -500, -5000 );
infospot10.addHoverText( "Escape to mountain" );
infospot10.addEventListener( 'click', function(){
  viewer.setPanorama( panorama2 );
} );


const infospot11 = new PANOLENS.Infospot( 75, PANOLENS.DataImage.Info );
infospot11.position.set( -500, -500, 2500 );
infospot11.addHoverElement( document.getElementById('imageD'), 250 );

const infospot12 = new PANOLENS.Infospot( 75, PANOLENS.DataImage.Info );
infospot12.position.set( 3500, 500, 2500 );
infospot12.addHoverElement( document.getElementById('audioD'), 50 );

const infospot13 = new PANOLENS.Infospot( 75, PANOLENS.DataImage.Info );
infospot13.position.set( 750, 800, 2500 );
infospot13.addHoverElement( document.getElementById('videoD'), -250 );


panorama1.add(infospot10, infospot11, infospot12,infospot13);





const infospot20 = new PANOLENS.Infospot( 250, PANOLENS.DataImage.Info );
infospot20.position.set( 100, 500, 5000 );
infospot20.addHoverText( "Desert" );
infospot20.addEventListener( 'click', function(){
  viewer.setPanorama( panorama1 );
} );


const infospot21 = new PANOLENS.Infospot( 100, PANOLENS.DataImage.Info );
infospot21.position.set( 300, -500, -1500 );
infospot21.addHoverElement( document.getElementById( 'video'), 350 );


const infospot22 = new PANOLENS.Infospot( 150, PANOLENS.DataImage.Info );
infospot22.position.set( 1300, -500, -1500 );
infospot22.addHoverElement( document.getElementById('imageM'), 250 );


const infospot23 = new PANOLENS.Infospot( 250, PANOLENS.DataImage.Info );
infospot23.position.set( -1300, -1500, -6000 );
infospot23.addHoverElement( document.getElementById('audio'), 100 );



panorama2.add(infospot20, infospot21, infospot22, infospot23);

const viewer = new PANOLENS.Viewer( { container: container } );
viewer.add( panorama1 ,panorama2 );

viewer.addUpdateCallback(function(){
  
});


