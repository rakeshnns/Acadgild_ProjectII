export class Character {
    public id: number;
    public name: string;
    public description: string;
    public thumbnail: Thumbnail;
}

export class Thumbnail {
    public path: string;
    public extension: string;
}

export class CharacterII {
    public id: number;
    public name: string;
    public description: string;
    public thumbnail: Thumbnail;
    public comics: Comics;
    public stories: Stories;
    public events: Events;
}

export class Comics {
    public available: number;
}

export class Stories {
    public available: number;
}

export class Events {
    public available: number;
}

export class CharacterCI {
    public id: number;
    public title: string;
    public description: string;
    public thumbnail: Thumbnail;
}


