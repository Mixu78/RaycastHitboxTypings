interface HitboxObject {
	/**
	 * Returns information about the current HitboxObject's RaycastParams.
	 * Writing to this property with your own RaycastParam settings will also change the way the raycasting works.
	 */
	RaycastParams: RaycastParams;

	/**
	 * If true, turns on the visualizer for the raycasts to see where you are aiming them.
	 * Highly recommended to leave it off for production games to conserve performance.
	 */
	Visualizer: boolean;

	/**
	 * If true, writes print logs to the output. Things like if it can find attachments will be recorded.
	 */
	DebugLog: boolean;

	/**
	 * Defaults to RaycastHitbox.DetectionMode.Default (1). Determines how the hit detection of the hitbox should be applied.
	 * Refer down below on all different types of DetectionModes.
	 *
	 * - Default (1) - Checks if a humanoid exists when this hitbox touches a part.
	 * The hitbox will not return humanoids it has already hit for the duration the hitbox has been active.
	 *
	 *
	 * - PartMode (2) - OnHit will return every hit part (in respect to the hitbox's RaycastParams),
	 * regardless if it's ascendant has a humanoid or not.
	 * OnHit will no longer return a humanoid so you will have to check it.
	 * The hitbox will not return parts it has already hit for the duration the hitbox has been active.
	 *
	 *
	 * - Bypass (3+) - PERFORMANCE MAY SUFFER IF THERE ARE A LOT OF PARTS. Use only if necessary.
	 * Similar to PartMode, the hitbox will return every hit part.
	 * Except, it will keep returning parts even if it has already hit them.
	 * Warning: If you have multiple raycast or attachment points, each raycast will also call OnHit.
	 * Allows you to create your own filter system.
	 */
	DetectionMode: 1 | 2 | 3;

	/**
	 * Merges existing Hitbox points with new Vector3 values relative to the part / bone position.
	 *
	 * This part can be a descendent of your original Hitbox model or can be an entirely different instance that is not related to the hitbox
	 * (example: Have a weapon with attachments and you can then add in more vector3 points without instancing new attachments,
	 * great for dynamic hitboxes).
	 *
	 * @param groupName When specified, if these points hit something,
	 * OnHit will return the same groupName parameter,
	 * allowing you to do different things depending on where your weapons hit.
	 */
	SetPoints(instance: BasePart | Bone, vector3Points: Vector3[], groupName?: string): void;

	/**
	 * Removes the given Vector3 values provided the part was the same as the ones you set in SetPoints.
	 */
	RemovePoints(instance: BasePart | Bone, vector3Points: Vector3[]): void;

	/**
	 * Specifies two attachments to be connected like a link.
	 * The Raycast module will raycast between these two points instead of following each frame.
	 */
	LinkAttachments(attachment1: Attachment, attachment2: Attachment): void;

	/**
	 * Removes a link of an attachment. Only needs the primary attachment (first parameter of LinkAttachments) to work.
	 * Will automatically sever the connection to the second attachment.
	 */
	UnlinkAttachments(attachment1: Attachment): void;

	/**
	 * Starts firing the rays for hit detection. Will only damage the target once. Call HitStop to reset the target pool so you can damage the same targets again. If HitStart hits a target(s), OnHit event will be called.
	 * Can specify an optional argument in seconds for the module to automatically turn off the Hitbox after 'N' seconds.
	 */
	HitStart(seconds?: number): void;

	/**
	 * Stops firing the rays and resets the target pool. Will do nothing if no rays are being fired from the hitbox.
	 */
	HitStop(): void;

	/**
	 * Disables the hitbox, cleans up all internal signals,
	 * sets itself to nil and marks it for garbage collection to be deleted in the next frame.
	 * It will also be automatically called if the object used for hitboxes (if specified initially) is destroyed.
	 */
	Destroy(): void;

	/**
	 * Fires when a part intersects a raycast. Will return the part it hits plus any raycast results.
	 * It will also return the point's groupName (nil by default).
	 *
	 * NOTICE: If your hitbox's PartMode is enabled, hitHumanoid will return nil.
	 * It is your responsibility to check if the humanoid exists.
	 */
	OnHit: RBXScriptSignal<
		(
			hitPart: BasePart,
			hitHumanoid: Humanoid | undefined,
			results: RaycastResult,
			groupName: string | undefined,
		) => void
	>;

	/**
	 * When a hitbox is active, fires for every point on every frame, returning a point's current position in the world.
	 */
	OnUpdate: RBXScriptSignal<(pointPosition: Vector3) => void>;
}

declare namespace RaycastHitbox {
	function nnew(object: Instance): HitboxObject;
	export { nnew as new };

	/**
	 * Returns an existing HitboxObject using the original object instance as its search parameter.
	 * Returns nil if no HitboxObject was found.
	 */
	export function GetHitbox(this: typeof RaycastHitbox, object: Instance): HitboxObject | undefined;
}

export = RaycastHitbox;
