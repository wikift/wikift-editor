# Wikift Editor

Wikift Editor 是一款基于editor.md的深度定制的富文本编辑器.

# 使用方式

component使用代码

```java
import { WikiftEditorModule } from '../directives/wikift-editor/wikift-editor.module';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    WikiftEditorModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

html页面使用代码

```java
  <wikift-editor [id]="'editor'" [markdown]="''"></wikift-editor>
```
