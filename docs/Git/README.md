# Git

![常用命令参考](/works/Git/img/28503711-4ea89b26144307a4.webp)

推荐资源：
[Git 官方文档](https://git-scm.com/book/zh/v2)、
[约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)、
[阮一峰 Git 使用规范流程](https://www.ruanyifeng.com/blog/2015/08/git-use-process.html)、
[阮一峰 常用 Git 命令清单](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)、
[阮一峰 Git 远程操作详解](https://www.ruanyifeng.com/blog/2014/06/git_remote.html)、
[GitGuide](https://zjdoc-gitguide.readthedocs.io/zh_CN/latest/)、
[学习 Git 分支](https://learngitbranching.js.org/?locale=zh_CN)、
[该死的 Git](https://dangitgit.com/zh)、
[图解 Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)

以下内容仅仅只是基础内容，个人开发熟悉基础用法即可，进阶用法针对项目团队进行。

## 简介

Git 代表一个分布式版本控制系统，Git 是为了提高多人协作开发效率和文件管理而生。当成员统一修改并使用 Git 提交。Git 会自动创建一个项目版本，记录了不同文件的差异，也可以随时回退到某个提交时的状态。

在此之前之前，需要
安装并配置 [Git](https://git-scm.com/)、
注册 [GitHub](https://www.github.com)或[Gitee](https://www.gitee.com) 账号、
推荐了解 [PowerShell](https://learn.microsoft.com/zh-cn/powershell/scripting/overview?view=powershell-7.3)或[cmd]()命令

PowerShell 最基本的几个命令你需要知道：

- pwd(print work directory) 显示当前终端会话所在目录位置
- ls(list file) 显示当前目录下所有文件
- cd(change directory) 切换目录，命令后跟路径（.表示当前路径，..表示上一级）
- echo "content" > filename 创建 filename 文件，并填充指定内容

## 一、初始化项目与基础命令

如果是首次使用 git 命令，需要设置用户名称与邮件地址，因为每一个 Git 的提交都会使用这些信息，并且它会写入到每一次提交中:

```shell
git config --global @user.name "username"
git config --global @user.email "useremail@xxx.com"

# 检查
git config user.name
git config user.email
```

使用命令`git init`初始化项目，成功会在当前目录生成 [.git 目录](https://zhuanlan.zhihu.com/p/106243588)，这个其实就是 Git 的版本库，.git 中有 stage（或者叫 index）的暂存区，还有 Git 为我们自动创建的第一个分支 master，以及指向 master 的一个指针叫 HEAD。

- workspace: 工作区
- index/Stage: 暂存区
- Repository: 本地版本库
- Remote: 远程版本库

平时我们写的代码都是在工作区，执行 add 命令后提交到了暂存区，再执行 commit 命令后就把代码提交到了本地版本库，最后再执行 push 命令把本地代码提交到远程版本库。

文件状态：git 会追踪文件状态，工作区中的文件状态为 Untracked/Unstage(未追踪状态)，提交到了暂存区的文件则为 stage(追踪状态)。

项目初始化完成后，使用`git status`可以显示工作目录和暂存区的状态。将文件添加到暂存区，可以通过`git add <file|dir>`将指定文件添加到暂存区，如果提交文件数量较多，可以使用`git add .`将当前目录所有文件加入暂存区。

需要将暂存区文件提交到版本库时，需附加提交说明信息：使用`git commit`命令，可以打开 vim 编辑器添加说明信息，vim 编辑器基本指令:

- q/i 进入编辑模式
- esc 推出编辑模式
- :wq 保存并推出 vim 编辑器

也提供了`git commit -m "<message>"`，无需打开 vim 编辑器即可添加说明信息，这种方法更常用

每次提交都会生成日志信息，使用`git log`命令可以查看日志信息，包含了日志的 commit id、作者、邮箱以及提交日期。

补充：说明信息可以是任何文本消息，但是一般都是有相应风格。这不是必须的，但推荐遵循这个规范，常见的规范参考:[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

完成了上面的 git add 和 git commit 命令就代表你的文件已经就绪，准备提交到 git 远程仓库。

补充：如果不想某个文件被提交到暂存区和远程仓库，可以将文件名添加到 .gitignore 文件中

思考：请思考下面的情况以及解决方案:

```shell
# content(README.md): first commit content
git add README.md
git commit -m "first commit"

# content(README.md): first commit content; rencurrence commit content;
git add README.md

# content(README.md):
# first commit content; rencurrence commit content; again commit content;

git status # ???
```

- `git diff` 比较当前文件和暂存区文件差异

[Git 基础-撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)

## 二、 版本回退

`git log` 获取提交版本的 commit id(HASH 值)
使用命令`git reset --hard <commit id>` 回退到指定版本，--hard 表示重置模式

- --hard 模式，表示硬重置，即覆盖所有变更
- --soft 模式
- --mixed 模式

恢复操作，可以使用`git reflog` 查看到所有历史版本信息（显示当前的 HEAD 和它的祖先）

## 三、 分支管理

常用命令：

- `git branch` 列出所有分支

- `git branch <branchname>` 创建分支
- `git checkout <branchname>` 切换分支，也可以使用 `git switch`
- `git checkout -b <branchname>` 创建并切换分支，上面两个命令合并操作
- `git switch -c <branchname>` 也可以使用 switch 新建并切换分支，与上面命令相同

- `git checkout -M <branchname>` 切换**主分支**
- `git merge <branchname>` 合并分支（其它分支合并到当前分支）

- `git diff master origin/master` 比较本地版本库和远程版本库差异
- `git branch -d <branchname>` 删除分支，前提是分支已经合并
- `git branch -D <branchname>` 强制删除分支，慎用!!!

- `git diff <branname> <branchname>` 在两个分支之间比较差异
- `git diff <id1><id1><id2>` 比较两次提交之间的差异
- `git diff --cached` 比较暂存区和版本库差异

[Git 由浅入深之分支管理](https://zhuanlan.zhihu.com/p/26227256)

## 二、 提交到远程仓库

一般企业会选择使用 GitLab 或者 Bitbucket 搭建私有服务器仓库，或者选择一些公共云服务器仓库，如 Github、Gitee。

Github 已经在 2021 年开始需要生成个人 token 来 push 了，需要 setting>>Deveioper settings>>Personal access tokens 设置

下面列出一些远程版本库常用命令：

- `git remote -v` 列出已经存在的远程分支的详细信息
- `git branch -r` 查看远程分支
- `git branch -a`查看所有分支。

- `git pull <远程主机名> <远程分支名>:<本地分支名>` 从指定分支拉取远程仓库到本地工作区
- `git clone <directory>` 克隆远程仓库到本地
- `git remote add <directory>` 关联远程仓库
- `git push -u origin <branchname>` 将指定分支推送到 origin 主机，-u 表示记住这次提交，下次就可以使用`git push`不需指定主机与分支名

- `git fetch` 拉取远程仓库到本地版本库（取回所有分支）
- `git fetch <远程主机名> <分支名>` 拉取远程仓库特定分支的更新
- `git checkout -b <分支名> <远程主机名>/<远程分支名>` 基与远程分支创建一个新分支
- `git diff` 对比本地版本库、工作区、远程版本库之间的区别，如`git diff origin/master`

- `git log` 查阅版本历史记录

## 三、 Git 协作流程

参考资料：[阮一峰 Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

常见的有三种工作流

- Git flow or [Git flow avh](https://github.com/petervanderdoes/gitflow-avh)
- [Github flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- Gitlab flow

### 分支介绍

1. master - 主分支，

   - 提供给用户使用的正式版本；
   - 不可在此分支进行 push 操作；

2. dev - 开发分支，

   - 基于 mastr 分支创建，需要发布时合并到 master
   - 不可进行 push 操作
   - 只能通过 [Pull Request](https://zhuanlan.zhihu.com/p/347918608)的方式将个人分支合并到此分支；
   - 开发过程中，要经常与此分支保持同步；

3. feature/xxx - 特性分支，用于某个功能模块的开发

   - 用于某个功能模块的开发；
   - 功能模块开发任务完成后，通过 Pull Request 请求合并，管理员 Code Review 通过后，该分支会被合并到 dev 分支，该分支也会被删除；
   - 分支由开发者个人管理和使用， 可以进行 push 操作；
   - 开发过程中，此类分支要经常与 dev 分支保持同步；

4. release/xxx - 预发布分支分支，发布正式版本前（即合并到 master 分支之前），我们可能需要有一个预发布的版本进行测试。

   - 基于 dev 分支，预发布结束以后，必须合并进 dev 和 master 分支
   - 用完即删

5. hotfix/xxx - 补丁分支

   - 紧急修复 Bug 的分支，由 master 分支创建，修补结束以后，再合并进 master 和 dev 分支
   - 修复工作完成，它们就会被合并进 master 或 dev 分支 （仅能通过 Pull Request 的方式），然后就被删除

### 开发者工作流参考

1. 克隆 dev 分支到本地 `git clone -b dev ...`

2. 新建分支

   - 获取 dev 分支最新代码
     ```shell
     # 获取 dev 分支最新代码
     git checkout dev
     git pull
     ```
   - 新建一个特性分支`git branch feature/xxx`
   - 切换到该特性分支开发`git checkout feature/xxx`

3. 提交分支

   ```shell
   git add .
   git commit -m "message"
   # git commit -a -m ""   直接提交到本地版本库
   # git commit -am ""     直接提交到本地版本库 -a和-m可以简写
   git push -u origin feature/xxx`/`git push
   ```

4. 与 dev 主干同步

   分支的开发过程中，要经常与 dev 主干保持同步

   ```shell
   # 获取 dev 分支最新代码
   git checkout dev
   git pull
   # 切换回当前开发的特性分支
   git checkout feature/xxx
   # 合并 dev 分支到当前分支
   git merge dev
   ```

5. 发出 Pull Request

   - 最后一次 **与 dev 主干同步** 工作，
   - 提交到远程仓库以后，发出 Pull Request 到 dev 分支，然后请求 Code Review ，确认可以合并到 dev 分支

   ```shell
   # 最后进行一次步骤三的同步工作

   # 提交到远程仓库
   git checkout feature/xxx
   git push origin feature/xxx

   # 在 GitHub/Gitee 管理界面创建 Pull Request，等待管理员进行 Code Review
   ```

6. 清理分支

   ```shell
   # 首先，切换回 dev 分支
   git checkout dev

   # 先删除远程特性分支
   git push origin -d feature/xxx

   # 再删除本地特性分支
   git branch -d feature/xxx
   ```

## 四、解决冲突

多个分支修改了同一个文件的内容或名称，会产生冲突，但是已经修改了的不同文件的部分，是不会产生冲突，直接合并即可。

预防冲突；规范、多次使用 `git pull`、`git fetch`、`git diff`
