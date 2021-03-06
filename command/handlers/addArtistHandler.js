const HandlerWithValidator = require('./handlerWithValidator');


class AddArtistHandler extends HandlerWithValidator {
    constructor() {
        super("AddArtist",['name', 'country']);
    }

    canHandle(aCommand) {
        return this.command === aCommand;
    }

    handle(unqfy, artistData) {
        this.validate(artistData);
        let addedArtist = unqfy.addArtist(artistData);
        console.log(`Se agregó satisfactoriamente al artista: ${addedArtist.name}`);
    }
}

module.exports = AddArtistHandler;