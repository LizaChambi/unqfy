const fs = require('fs'); // necesitado para guardar/cargar unqfy
const UNQfy = require('./unqfy'); // importamos el modulo unqfy
const PlaylistService = require('./services/playlistService');
const ArtistService = require('./services/artistsService');

class UnqfyFileSystem{
    constructor(unqfyRepository){
        this.repository = unqfyRepository;
    }

    getUNQfy(filename) {
        let playlistService = new PlaylistService();
        let artistService = new ArtistService();
        let unqfy = new UNQfy(playlistService, artistService);
        if (fs.existsSync(filename)) {
            unqfy = this.repository.load(filename);
        }
        return unqfy;
    }

    saveUNQfy(unqfy, filename) {
        this.repository.save(unqfy, filename);
    }

}

module.exports = UnqfyFileSystem;