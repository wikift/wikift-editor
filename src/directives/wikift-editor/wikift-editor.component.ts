/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit, Output, Input, EventEmitter, Directive } from '@angular/core';
import { AfterViewInit, OnChanges, ViewChild } from '@angular/core';

declare var jQuery: any;
declare var editormd: any;

@Component({
    selector: 'wikift-editor',
    templateUrl: './wikift-editor.component.html'
})
export class WikiftEditorComponent implements OnInit {

    public editor: any;

    // 编辑器ID
    @Input('id')
    id: string;

    // 编辑器TOCid
    @Input('tocId')
    tocId = 'wikift-toc-container';

    // 传递的markdown数据
    @Input('markdown')
    markdown: string;

    // 是否预览模式
    @Input('preview')
    preview: Boolean = false;

    // 编辑器模式, full, simple, mini
    @Input('mode')
    mode = 'full';

    // 编辑器高度
    @Input('height')
    height = 490;

    // 自动获取焦点
    @Input('focus')
    focus = false;

    // 预览模式
    @Input('watch')
    watch = true;

    constructor() { }

    // 初始化组件
    ngAfterViewInit() {
        const config = {
            id: this.id,
            markdown: this.markdown,
            tocContainer: this.tocId,
            tex: true,
            flowChart: true,
            emoji: true,
            taskList: true,
            sequenceDiagram: true,
            toolbarIcons: this.getToolbarIcons(this.mode),
            width: '100%',
            height: this.height,
            syncScrolling: 'single',
            autoFocus: this.focus,
            watch: this.watch,
            path: '../../../../assets/wikift-editor/js/lib/',
            imageUploadURL: 'api/upload/mdupload?test=dfdf'
        };

        if (this.preview) {
            editormd.markdownToHTML(this.id, config);
        } else {
            this.editor = editormd(config);
        }
    }

    /**
     * 初始化组件信息
     */
    ngOnChanges() {
    }

    ngOnInit() {
        jQuery('.editormd-preview-close-btn').hide();
    }

    /**
     * 将子组件获取的内容传输到父组件
     */
    // tslint:disable-next-line:member-ordering
    @Output()
    getEditorValue = new EventEmitter<any>();
    getValue() {
        this.getEditorValue.emit(this.editor.getMarkdown());
    }

    getToolbarIcons(mode) {
        switch (mode) {
            default:
            case 'full':
                return ['undo', 'redo', '|', 'bold', 'del', 'italic', 'quote',
                    'ucwords', 'uppercase', 'lowercase', '|', 'h1', 'h2',
                    'h3', 'h4', 'h5', 'h6', '|', 'list-ul', 'list-ol', 'hr',
                    '|', 'link', 'reference-link', 'image', 'code', 'preformatted-text',
                    'code-block', 'table', 'datetime', 'emoji', 'html-entities',
                    'pagebreak', '|', 'goto-line', 'watch', 'preview', 'fullscreen',
                    'clear', 'search', '|', 'help'];
            case 'simple':
                return ['undo', 'redo', '|', 'bold', 'del', 'italic', 'quote',
                    'uppercase', 'lowercase', '|', 'h1', 'h2', 'h3', 'h4', 'h5',
                    'h6', '|', 'list-ul', 'list-ol', 'hr', '|', 'watch', 'preview',
                    'fullscreen', '|', 'help'];
            case 'mini':
                return ['undo', 'redo', 'watch', 'preview', 'help'];
            case 'comment':
                return ['undo', 'redo', '|', 'bold', 'del', 'italic', 'quote',
                    'uppercase', 'lowercase', '|', 'h1', 'h2', 'h3', 'h4', 'h5',
                    'h6', '|', 'list-ul', 'list-ol', 'hr', '|', 'watch', 'preview'];
        }
    }

}
