const flatMap = require('array.prototype.flatmap');
const NotFoundException = require('../errors/notFoundException');

class Artist{
    constructor(id, aName, aCountry){
        this.id = id;
        this.name = aName;
        this.country = aCountry;
        this.albums = [];
    }

    getAllAlbums(){
        return this.albums;
    }

    addAlbum(anAlbum){
        this.albums.push(anAlbum);
    }

    getAlbumByName(anAlbumName){
        return this.albums.find(this.isTheAlbum(anAlbumName));
    }

    deleteAlbum(anAlbumName){
        let albumtoDelete = this.getAlbumByName(anAlbumName);
        let tracksFromDeletedAlbum = albumtoDelete.getTracks();
        let indexToDelete = this.getIndexOfAlbum(albumtoDelete);
        this.deleteAlbumInPosition(indexToDelete);
        return tracksFromDeletedAlbum;
    }

    getIndexOfAlbum(anAlbum) {
        return this.albums.indexOf(anAlbum);
    }

    deleteAlbumInPosition(indexOfAlbum) {
        if (indexOfAlbum > -1) {
            this.albums.splice(indexOfAlbum, 1);
        }
    }

    isTheAlbum(anAlbumName){
        return x => x.name === anAlbumName;
    }

    sameId(anId){
        return this.id === anId;
    }

    sameName(aName){
        return this.name === aName;
    }

    containsInName(aWord){
        return this.name.includes(aWord);
    }

    getTracks(){
        return flatMap(this.albums, anAlbum => anAlbum.tracks);
    }

    addTrackToAlbum(albumName, trackData){
        let album = this.getAlbumByName(albumName);
        if(!Boolean(album)){
            throw new NotFoundException('Album');
        }
        return album.addTrack(trackData);
    }
}

module.exports = Artist;