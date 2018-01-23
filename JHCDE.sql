/*
Navicat MySQL Data Transfer

Source Server         : local_mysql
Source Server Version : 50720
Source Host           : 127.0.0.1:3306
Source Database       : JHCDE

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2018-01-23 17:26:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for C_CON_VS_VAL
-- ----------------------------
DROP TABLE IF EXISTS `C_CON_VS_VAL`;
CREATE TABLE `C_CON_VS_VAL` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CID` int(11) NOT NULL COMMENT '取值自：VOPTIONS表的ID ；代表：概念域中的值定义',
  `FID` int(11) DEFAULT NULL COMMENT '取值自：ELEMENTS表的ID ；代表：数据元概念',
  `CTIP` varchar(255) DEFAULT NULL COMMENT '概念域中的值定义的标注',
  `FTIP` varchar(255) DEFAULT NULL COMMENT '数据元概念的标注',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for C_ELEMENT
-- ----------------------------
DROP TABLE IF EXISTS `C_ELEMENT`;
CREATE TABLE `C_ELEMENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(255) DEFAULT NULL,
  `VAL_DO_ID` int(11) DEFAULT NULL COMMENT '值域ID',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  `DATATYPE` varchar(40) DEFAULT NULL COMMENT '数据类型',
  `DISPLAY` varchar(40) DEFAULT NULL COMMENT '数据表示',
  `OBJECT_ID` int(11) DEFAULT NULL COMMENT '对象类ID',
  `FEATURE_ID` int(11) DEFAULT NULL COMMENT '特性ID',
  `DISPLAY_ID` int(11) DEFAULT NULL COMMENT '表示类ID',
  `UNIT_ID` int(11) DEFAULT NULL COMMENT '计量单位ID',
  `FID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据元';

-- ----------------------------
-- Table structure for C_ELE_VS_SET
-- ----------------------------
DROP TABLE IF EXISTS `C_ELE_VS_SET`;
CREATE TABLE `C_ELE_VS_SET` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `CID` tinyint(11) DEFAULT NULL COMMENT '儿子ID数据元ID',
  `CTYPE` tinyint(11) DEFAULT NULL,
  `FID` tinyint(11) DEFAULT NULL COMMENT '父ID数据集/数据组',
  `FTYPE` tinyint(11) DEFAULT NULL COMMENT '1为数据元 2为数据组',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='特性';

-- ----------------------------
-- Table structure for C_OBJECT
-- ----------------------------
DROP TABLE IF EXISTS `C_OBJECT`;
CREATE TABLE `C_OBJECT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='对象类';

-- ----------------------------
-- Table structure for C_PERM_OPT
-- ----------------------------
DROP TABLE IF EXISTS `C_PERM_OPT`;
CREATE TABLE `C_PERM_OPT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `VALUE` varchar(255) DEFAULT NULL,
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  `CONCEPT_ID` int(11) DEFAULT NULL,
  `FID` int(11) DEFAULT '0' COMMENT '默认为0 ，不为0时为同义词',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='允许值';

-- ----------------------------
-- Table structure for C_PROPERTY
-- ----------------------------
DROP TABLE IF EXISTS `C_PROPERTY`;
CREATE TABLE `C_PROPERTY` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `CODE` varchar(100) DEFAULT NULL COMMENT '编码',
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  `UNIT_ID` int(11) DEFAULT NULL COMMENT '计量单位ID',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='特性';

-- ----------------------------
-- Table structure for C_REPRESENT
-- ----------------------------
DROP TABLE IF EXISTS `C_REPRESENT`;
CREATE TABLE `C_REPRESENT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='表示';

-- ----------------------------
-- Table structure for C_SET
-- ----------------------------
DROP TABLE IF EXISTS `C_SET`;
CREATE TABLE `C_SET` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  `GROUPID` tinyint(4) DEFAULT NULL COMMENT '类别ID',
  `ISSET` tinyint(4) DEFAULT NULL COMMENT '1为数据集 2为数据组',
  `STANDARD` tinyint(4) DEFAULT NULL COMMENT '1为国标 2为企标',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据集';

-- ----------------------------
-- Table structure for C_UNIT
-- ----------------------------
DROP TABLE IF EXISTS `C_UNIT`;
CREATE TABLE `C_UNIT` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `CODE` varchar(100) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL COMMENT '名称',
  `DESCRIPTION` varchar(255) DEFAULT NULL COMMENT '定义描述',
  `FROM` tinyint(4) DEFAULT NULL COMMENT '数据来源（系统）1为EPM 2为CDE',
  `CREATE_MAN` varchar(50) DEFAULT NULL COMMENT '创建人',
  `CREATE_DATE` varchar(50) DEFAULT NULL COMMENT '创建日期',
  `DEL_FLAG` tinyint(4) DEFAULT NULL COMMENT '是否启用 1为启用 2为停用',
  `STATUS` tinyint(4) DEFAULT NULL COMMENT '数据状态：1为未审核 2为已审核 ',
  `UPDATE_MAN` varchar(40) DEFAULT NULL COMMENT '最后修改人',
  `UPDATE_DATE` varchar(50) DEFAULT NULL COMMENT '最后修改日期',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='计量单位';
SET FOREIGN_KEY_CHECKS=1;
