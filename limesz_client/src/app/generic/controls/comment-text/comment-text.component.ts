import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-text',
  templateUrl: './comment-text.component.html',
  styleUrls: ['./comment-text.component.scss']
})
export class CommentTextComponent implements OnInit {
  @Input() public HeaderText: string = "";
  @Input() public Placeholder: string = "";
  @Input() public Value: string = "";
  @Input() public Rows: number = 1;
  @Output() public ValueChange: EventEmitter<string> = new EventEmitter<string>();
  public isEmojiPickerVisible: boolean = false;
  public addEmoji(event: any) {
    this.isEmojiPickerVisible = true;
    this.Value = `${this.Value}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  constructor () { }

  ngOnInit(): void {
  }

}
