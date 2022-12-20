# Git

推荐资源：
[Git 官方文档](https://git-scm.com/book/zh/v2)、
[约定式提交规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)、
[GitGuide](https://zjdoc-gitguide.readthedocs.io/zh_CN/latest/)、
[学习 Git 分支](https://learngitbranching.js.org/?locale=zh_CN)、
[该死的 Git](https://dangitgit.com/zh)、
[0 入门 Git，快速上手](https://juejin.cn/post/7086831853428670478)

以下内容仅仅只是基础内容，个人开发熟悉基础用法即可，进阶用法针对项目团队进行。

## 简介

Git 代表一个分布式版本控制系统，Git 是为了提高多人协作开发效率和文件管理而生。当成员统一修改并使用 Git 提交。Git 会自动创建一个项目版本，记录了不同文件的差异，也可以随时回退到某个提交时的状态。

在此之前之前，需要
安装并配置 [Git](https://git-scm.com/)、
注册 [GitHub](https://www.github.com)或[Gitee](https://www.gitee.com) 账号、
推荐了解 [PowerShell](https://learn.microsoft.com/zh-cn/powershell/scripting/overview?view=powershell-7.3)或[cmd]()命令

PowerShell 最基本的三个命令你需要知道：

- pwd(print work directory) 显示当前终端会话所在目录位置
- ls(list file) 显示当前目录下所有文件
- vd(change directory) 切换目录，命令后跟路径（.表示当前路径，..表示上一级）

## 一、初始化项目与基础命令

如果是首次使用 git 命令，需要设置用户名称与邮件地址，因为每一个 Git 的提交都会使用这些信息，并且它会写入到每一次提交中:

```shell
git config --global @user.name "username"
git config --global @user.email "useremail@xxx.com"

# 检查
git config user.name
git config user.email
```

使用命令`git init`初始化项目，成功会在当前目录生成 [.git 目录](https://zhuanlan.zhihu.com/p/106243588)

项目初始化完成后，可以通过`git add <file|dir>`将指定文件添加到暂存区，如果提交文件数量较多，可以使用`git add .`将当前目录所有文件加入暂存区或`git add *` 将所有未管理文件添加到暂存区。

需要将暂存区文件提交到版本库时，需附加提交说明信息：使用`git commit`命令，可以打开 vim 编辑器添加说明信息，vim 编辑器基本操作:

- q/i 进入编辑模式
- esc 推出编辑模式
- :wq 保存并推出

也提供了`git commit -m "<message>"`，无需打开 vim 编辑器即可添加说明信息，这种方法更常用

每次提交都会生成日志信息，使用`git log`命令可以查看日志信息，包含了日志的 commit id、作者、邮箱以及提交日期。

补充：说明信息可以是任何文本消息，但是一般都是有相应风格。这不是必须的，但推荐遵循这个规范，常见的规范参考:[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)

完成了上面的 git add 和 git commit 命令就代表你的文件已经就绪了，准备提交到 git 仓库。

## 二、 版本回退

`git log`获取版本的 commit id
使用命令`git reset --hard <commit id>` 回退到指定版本，--hard 表示重置模式

- --hard 模式，表示硬重置，即覆盖所有变更
- --soft 模式
- --mixed 模式

恢复操作，可以使用`git reflog` 查看到所有历史版本信息（显示当前的 HEAD 和它的祖先）

## 三、 分支管理

常用命令：

- `git branch` 列出所有分支
- `git branch <branchname>` 创建分支
- `git checkout <branchname>` 切换分支
- `git checkout -b <branchname>` 创建并切换分支
- `git checkout -M <branchname>` 切换**主分支**
- `git merge <branchname>` 合并分支到主分支
- `git branch -d <branchname>`删除分支

## 二、 提交到 git 仓库

一般企业会选择使用 GitLab 或者 Bitbucket 常见私有服务区仓库，除了这些也有一些公共云服务器仓库，如 Github、Gitee。

下面以远程云服务仓库为例，列出一些常用命令：

- `git clone <directory>` 克隆远程仓库到本地
- `git remote -v` 列出已经存在的远程分支
- `git remote add <directory>` 关联远程仓库,url 为远程仓库地址
- `git pull --rebase origin <branchname>` 从指定分支拉取远程仓库到本地
- `git push -u origin <branchname>` 从指定分支推送文件到远程仓库

## 三、 Git 三大特色

暂存区
分支
工作流
