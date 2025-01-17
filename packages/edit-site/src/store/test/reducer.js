/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	settings,
	homeTemplateId,
	editedPost,
	blockInserterPanel,
	listViewPanel,
} from '../reducer';

import { setIsInserterOpened, setIsListViewOpened } from '../actions';

describe( 'state', () => {
	describe( 'settings()', () => {
		it( 'should apply default state', () => {
			expect( settings( undefined, {} ) ).toEqual( {} );
		} );

		it( 'should default to returning the same state', () => {
			const state = {};
			expect( settings( state, {} ) ).toBe( state );
		} );

		it( 'should update settings with a shallow merge', () => {
			expect(
				settings(
					deepFreeze( {
						setting: { key: 'value' },
						otherSetting: 'value',
					} ),
					{
						type: 'UPDATE_SETTINGS',
						settings: { setting: { newKey: 'newValue' } },
					}
				)
			).toEqual( {
				setting: { newKey: 'newValue' },
				otherSetting: 'value',
			} );
		} );
	} );

	describe( 'homeTemplateId()', () => {
		it( 'should apply default state', () => {
			expect( homeTemplateId( undefined, {} ) ).toEqual( undefined );
		} );

		it( 'should default to returning the same state', () => {
			const state = {};
			expect( homeTemplateId( state, {} ) ).toBe( state );
		} );
	} );

	describe( 'editedPost()', () => {
		it( 'should apply default state', () => {
			expect( editedPost( undefined, {} ) ).toEqual( {} );
		} );

		it( 'should default to returning the same state', () => {
			const state = [];
			expect( editedPost( state, {} ) ).toBe( state );
		} );

		it( 'should update when a template is set', () => {
			expect(
				editedPost(
					{ id: 1, type: 'wp_template' },
					{
						type: 'SET_TEMPLATE',
						templateId: 2,
					}
				)
			).toEqual( { id: 2, type: 'wp_template' } );
		} );

		it( 'should update when a page is set', () => {
			expect(
				editedPost(
					{ id: 1, type: 'wp_template' },
					{
						type: 'SET_PAGE',
						templateId: 2,
						page: {},
					}
				)
			).toEqual( { id: 2, type: 'wp_template', page: {} } );
		} );

		it( 'should update when a template part is set', () => {
			expect(
				editedPost(
					{ id: 1, type: 'wp_template' },
					{
						type: 'SET_TEMPLATE_PART',
						templatePartId: 2,
					}
				)
			).toEqual( { id: 2, type: 'wp_template_part' } );
		} );
	} );

	describe( 'blockInserterPanel()', () => {
		it( 'should apply default state', () => {
			expect( blockInserterPanel( undefined, {} ) ).toEqual( false );
		} );

		it( 'should default to returning the same state', () => {
			expect( blockInserterPanel( true, {} ) ).toBe( true );
		} );

		it( 'should set the open state of the inserter panel', () => {
			expect(
				blockInserterPanel( false, setIsInserterOpened( true ) )
			).toBe( true );
			expect(
				blockInserterPanel( true, setIsInserterOpened( false ) )
			).toBe( false );
		} );

		it( 'should close the inserter when opening the list view panel', () => {
			expect(
				blockInserterPanel( true, setIsListViewOpened( true ) )
			).toBe( false );
		} );

		it( 'should not change the state when closing the list view panel', () => {
			expect(
				blockInserterPanel( true, setIsListViewOpened( false ) )
			).toBe( true );
		} );
	} );

	describe( 'listViewPanel()', () => {
		it( 'should apply default state', () => {
			expect( listViewPanel( undefined, {} ) ).toEqual( false );
		} );

		it( 'should default to returning the same state', () => {
			expect( listViewPanel( true, {} ) ).toBe( true );
		} );

		it( 'should set the open state of the list view panel', () => {
			expect( listViewPanel( false, setIsListViewOpened( true ) ) ).toBe(
				true
			);
			expect( listViewPanel( true, setIsListViewOpened( false ) ) ).toBe(
				false
			);
		} );

		it( 'should close the list view when opening the inserter panel', () => {
			expect( listViewPanel( true, setIsInserterOpened( true ) ) ).toBe(
				false
			);
		} );

		it( 'should not change the state when closing the inserter panel', () => {
			expect( listViewPanel( true, setIsInserterOpened( false ) ) ).toBe(
				true
			);
		} );
	} );
} );
