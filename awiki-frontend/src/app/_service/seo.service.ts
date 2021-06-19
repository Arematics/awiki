import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService{
  constructor(private title: Title, private meta: Meta) { }


  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateDescription(desc: string): void {
    this.meta.updateTag({ name: 'description', content: desc });
  }

  updateKeywords(desc: string): void {
    this.meta.updateTag({ name: 'keywords', content: desc });
  }

  addKeywords(words: string[]): void{
    const keywords = this.meta.getTag('name= "keywords"');
    words.forEach(word => keywords.content = keywords.content + ', ' + word);
    this.updateKeywords(keywords.content);
  }

  removeKeywords(words: string[]): void{
    const keywords = this.meta.getTag('name= "keywords"');
    const filtered = keywords.content
      .split(',')
      .join('')
      .split(' ')
      .filter(word => words.indexOf(word) === -1);
    this.updateKeywords(filtered.join(', '));
  }
}
