## Word Add-ins
 
- Requirement:  
    - Office for Mac 2016 - Word (15.22 or later) Node.js runtime
-  Download the manifest.xml to a folder[A]:
    - [chinese-checker-manifest.xml](https://github.com/GarnixVai/ChineseSpellingChecker/blob/master/chinese-checker-manifest.xml)
    - [english-checker-manifest.xml](https://github.com/dspp779/gec-githubpage/blob/master/english-checker-manifest)



```
(in the A folder)


mv ~/Library/Containers/com.microsoft.Word/Data/Documents ~/Library/Containers/com.microsoft.Word/Data/documents

mkdir ~/Library/Containers/com.microsoft.Word/Data/documents/wef

cp chinese-checker-manifest.xml english-checker-manifest.xml ~/Library/Containers/com.microsoft.Word/Data/documents/wef



```

Activate:

```
activate it in word >> insert >> my add-ins. >> English Grammar Checker/ 中文拼字校正


```


