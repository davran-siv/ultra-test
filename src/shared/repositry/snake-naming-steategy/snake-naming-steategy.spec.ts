import { SnakeNamingStrategy } from './snake-naming-steategy';

describe('SnakeNamingStrategy', () => {
  const snakeNamingStrategy = new SnakeNamingStrategy();
  const camelCasedText = 'tableName';
  const snakeCasedText = 'table_name';
  describe('tableName', () => {
    it('should convert to snake case', () => {
      expect(snakeNamingStrategy.tableName(camelCasedText)).toEqual(
        snakeCasedText,
      );
    });
    it('should return customName ', () => {
      expect(
        snakeNamingStrategy.tableName(camelCasedText, 'customName'),
      ).toEqual('customName');
    });
  });
  describe('relationName', () => {
    it('should convert to snake case', () => {
      expect(snakeNamingStrategy.relationName(camelCasedText)).toEqual(
        snakeCasedText,
      );
    });
  });
  describe('joinColumnName', () => {
    it('should convert to snake case', () => {
      expect(
        snakeNamingStrategy.joinColumnName(camelCasedText, camelCasedText),
      ).toEqual(`${snakeCasedText}_${snakeCasedText}`);
    });
  });
  describe('joinTableName', () => {
    it('should convert to snake case', () => {
      expect(
        snakeNamingStrategy.joinTableName(
          camelCasedText,
          camelCasedText,
          'first.propertyName',
          'second.propertyName',
        ),
      ).toEqual(`${snakeCasedText}_first_property_name_${snakeCasedText}`);
    });
  });
  describe('joinTableColumnName', () => {
    it('should convert to snake case with property', () => {
      expect(
        snakeNamingStrategy.joinTableColumnName(camelCasedText, camelCasedText),
      ).toEqual(`${snakeCasedText}_${snakeCasedText}`);
    });
    it('should convert to snake case with column name', () => {
      expect(
        snakeNamingStrategy.joinTableColumnName(
          camelCasedText,
          camelCasedText,
          'columnName',
        ),
      ).toEqual(`${snakeCasedText}_column_name`);
    });
  });
  describe('classTableInheritanceParentColumnName', () => {
    it('should convert to snake case', () => {
      expect(
        snakeNamingStrategy.classTableInheritanceParentColumnName(
          camelCasedText,
          camelCasedText,
        ),
      ).toEqual(`${snakeCasedText}_${snakeCasedText}`);
    });
  });
  describe('eagerJoinRelationAlias', () => {
    it('should convert to snake', () => {
      expect(
        snakeNamingStrategy.eagerJoinRelationAlias(
          camelCasedText,
          'camel.CasedText',
        ),
      ).toEqual(`${camelCasedText}__camel_CasedText`);
    });
  });
});
