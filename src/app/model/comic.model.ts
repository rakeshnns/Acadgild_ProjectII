export class Comics {
    public id: number;
    public title: string;
    public description: string;
    public thumbnail: Thumbnail;
}

export class Thumbnail {
    public path: string;
    public extension: string;
}

export class ComicsII {
    public id: number;
    public title: string;
    public description: string;
    public thumbnail: Thumbnail;
    public prices: Prices[];
    public creators: Creators;
}

export class Prices {
    public type: string;
    public price: number;
}

export class Creators {
    public available: number;
}

export class ComicsChar {
    public id: number;
    public name: string;
    public thumbnail: Thumbnail;
}

export class ComicsCreator {
    public id: number;
    public fullName: string;
    public thumbnail: Thumbnail;
    public series: SeriesList;
    public stories: StoryList;
    public comics: ComicList;
    public events: EventList;
}

export class SeriesList {
    public available: number;
}

export class StoryList {
    public available: number;
}

export class ComicList {
    public available: number;
}

export class EventList {
    public available: number;
}
