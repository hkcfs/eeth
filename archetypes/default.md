---
author: "hkcfs"
date: '{{ .Date | time.Format "2006-01-02" }}'
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
tags:
  - linux
	
draft: true
---
