import { HitboxObject } from "./HitboxObject";

export = RaycastHitbox;

declare namespace RaycastHitbox {
	/**
	 * Returns a HitboxObject that contains information and functions needed for basic hit detection functionality.
	 */
	export function Initialize(this: typeof RaycastHitbox, object: Instance, ignoreList: Instance[]): HitboxObject;

	/**
	 * Cleans up an existing HitboxObject using the original object instance as its search parameter.
	 * If found, disables any running functions and queues it for garbage collection.
	 * Is automatically ran if the instance object attached to this HitboxObject is destroyed or
	 * parented to a realm that is not the physical dimension.
	 */
	export function Deinitialize(this: typeof RaycastHitbox, object: Instance): void;

	/**
	 * Returns an existing HitboxObject using the original object instance as its search parameter.
	 * Returns nil if no HitboxObject was found.
	 */
	export function GetHitbox(this: typeof RaycastHitbox, object: Instance): HitboxObject | undefined;
}
