"""Initial migration

Revision ID: 927b9a328517
Revises: aa1b37f9369a
Create Date: 2025-04-15 08:29:40.265907

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '927b9a328517'
down_revision = 'aa1b37f9369a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('label')
    )
    op.create_table('crime_report_tag',
    sa.Column('crime_report_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('user_note', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['crime_report_id'], ['crime_report.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('crime_report_id', 'tag_id')
    )
    with op.batch_alter_table('crime_report', schema=None) as batch_op:
        batch_op.add_column(sa.Column('severity_level', sa.String(length=20), nullable=False))
        batch_op.add_column(sa.Column('location_id', sa.Integer(), nullable=True))
        batch_op.alter_column('date_reported',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.DateTime(),
               nullable=True)
        batch_op.create_foreign_key(None, 'crime_location', ['location_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('crime_report', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.alter_column('date_reported',
               existing_type=sa.DateTime(),
               type_=sa.VARCHAR(length=100),
               nullable=False)
        batch_op.drop_column('location_id')
        batch_op.drop_column('severity_level')

    op.drop_table('crime_report_tag')
    op.drop_table('tag')
    # ### end Alembic commands ###
