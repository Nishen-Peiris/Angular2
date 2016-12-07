import { Component, ElementRef, OnInit, EventEmitter, Output, Inject, ComponentRef } from '@angular/core';
import { Http } from '@angular/http';

declare var tinymce: any;

@Component({
    selector: 'my-app',
    template: `<div id="tinyFormGroup" class="form-group">
    <div class="hidden">
        <textarea id="baseTextArea">{{htmlContent}}</textarea>
    </div>
</div>`,
    inputs: ['mceContent'],
    outputs: ['contentChanged']
})

// source of this module - 
// http://www.unitydatasystems.com/blog/2015/12/16/angular-2-tinymce-wysiwyg-editor/

export class EditorComponent {

    private elementRef: ElementRef;
    private elementID: string;
    private htmlContent: string;

    public contentChanged: EventEmitter<any>;

    constructor(@Inject(ElementRef) elementRef: ElementRef)
    {
        this.elementRef = elementRef;

        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();

        this.elementID = 'tinymce' + uniqid;
        this.contentChanged = new EventEmitter();
    }

    ngAfterViewInit()
    {
        //Clone base textarea
        var baseTextArea = this.elementRef.nativeElement.querySelector("#baseTextArea");
        var clonedTextArea = baseTextArea.cloneNode(true);
        clonedTextArea.id = this.elementID;

        var formGroup = this.elementRef.nativeElement.querySelector("#tinyFormGroup");
        formGroup.appendChild(clonedTextArea);

        //Attach tinyMCE to cloned textarea
        tinymce.init(
            {
                mode: 'exact',
                height: 500,
                theme: 'modern',
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table contextmenu paste code'
                ],
                toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                elements: this.elementID,
                setup: this.tinyMCESetup.bind(this)
            }
        );
    }

    ngOnDestroy() {
        //destroy cloned elements
        tinymce.get(this.elementID).remove();

        var elem = document.getElementById(this.elementID);
        elem.parentElement.removeChild(elem);
    }

    tinyMCESetup(ed: any) {
        ed.on('keyup', this.tinyMCEOnKeyup.bind(this));
    }

    tinyMCEOnKeyup(e: any) {
        this.contentChanged.emit(tinymce.get(this.elementID).getContent());
    }

    set mceContent(content: any) {
        this.htmlContent = content;
    }
}