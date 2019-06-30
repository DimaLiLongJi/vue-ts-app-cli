#! /usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer')

const cwdPath = process.cwd();
const exec = require("child_process").exec;

// 读取模板并复制文件
async function copyTemplate(templatePath, targetPath) {
  try {
    const paths = fs.readdirSync(templatePath);
    paths.forEach(_path => {
      const _targetPath = path.resolve(targetPath, _path);
      const _templatePath = path.resolve(templatePath, _path);
      console.log("创建中...  " + _targetPath);
      if (!fs.statSync(_templatePath).isFile()) {
        fs.mkdirSync(_targetPath);
        copyTemplate(_templatePath, _targetPath);
      } else {
        copyFile(_targetPath, _templatePath);
      }
    });
  } catch (error) {
    console.log(error);
    console.log('    ', '----------------------------------------');
    console.log('    ', chalk.red('★'), chalk.red('构建失败'));
    console.log('    ', chalk.red('★'), chalk.red(`失败原因: ${error}`));
    return false;
  }
  return true;
}

async function copyFile(_targetPath, _templatePath) {
  await fs.writeFileSync(_targetPath, fs.readFileSync(_templatePath), "utf-8");
}

program
  .version('0.1.0')
  .parse(process.argv);

// init 命令
program
  .command('create')
  .description('基于@vue/cli创建中移前端项目')
  .action(async (cmd, option) => {
    // 获取交互 使用哪种语言
    const answers = await inquirer.prompt([{
      type: 'list',
      name: 'languageChoice',
      message: '想用什么语言写vue应用呢',
      choices: [
        {
          name: 'JavaScript',
          value: 'js'
        },
        {
          name: 'TypeScript',
          value: 'ts'
        }
      ]
    }]);
    // 设置模板路径
    let templatePath = '';
    if (answers.languageChoice === 'js') templatePath = path.resolve(__dirname, '../js-template');
    else templatePath = path.resolve(__dirname, '../ts-template');

    // 复制模板
    const result = await copyTemplate(templatePath, cwdPath);
    if (result) {
      console.log('    ', '----------------------------------------');
      console.log('    ', chalk.green('★'), chalk.green('npm依赖包安装中'));
      exec('npm install', {
        encoding: 'utf-8'
      }).on('exit', (code) => {
        console.log('    ', '----------------------------------------');
        console.log('    ', chalk.green('★'), chalk.green('构建成功'));
        console.info('    ', chalk.green('★'), chalk.green('请在命令行输入 npm run dashboard 并导入项目！'));
      });
    }
  });

program.parse(process.argv);
