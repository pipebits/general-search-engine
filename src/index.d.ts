declare module 'general-search-engine' {
  type SearchTypes = 'github' | 'image' | 'npm' | 'search' | 'wikipedia';
  interface SearchOptions {
    language:
      | 'en'
      | 'de'
      | 'es'
      | 'fr'
      | 'it'
      | 'ja'
      | 'ko'
      | 'pt'
      | 'zh-cn'
      | 'zh-tw';
  }

  export interface SearchResultItem {
    title: string;
    link: string;
    description: string;
  }

  export interface WikipediaResultItem {
    title: string;
    descriptions: string;
    link: string;
  }

  export interface GithubResultItem {
    title: string | null;
    author: string | null;
    description: string | null;
    topics: string | null;
    stars: string;
  }

  export interface NpmResultItem {
    title: string | null;
    description: string | null;
    author: string | null;
    version: string | null;
    keywords: string | null;
    maintenance: string | null;
    quality: string | null;
    popularity: string | null;
  }

  export interface ImageResultItem {
    image: string | null;
    title: string | null;
    from: string | null;
  }

  type SearchRunResults =
    | GithubResultItem[]
    | SearchResultItem[]
    | WikipediaResultItem[]
    | NpmResultItem[]
    | ImageResultItem[];

  declare class Search {
    constructor();
    searchType: SearchTypes;
    setType(searchType: SearchTypes): this {
      this.searchType = searchType;
      return this;
    }
    setQuery(query: string): this;
    setOptions(options: SearchOptions): this;
    run(): SearchRunResults;
  }

  interface Gse {
    version: '1.4.0';
    homepage: 'https://github.com/pipebits/general-search-engine#readme';
    bugReport: 'https://github.com/pipebits/general-search-engine/issues';
    contact: {
      Email: 'pipeluis777@outlook.com';
      Discord: 'pipebits#7955';
      Github: 'https://githbub.com/pipebits';
    };

    search: typeof Search;
  }
  const gse: Gse;
  export default gse;
}
