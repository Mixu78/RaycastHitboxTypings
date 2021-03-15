export interface HitboxObject {
	/**
	 * Returns information about the current HitboxObject's RaycastParams.
	 * Writing to this property with your own RaycastParam settings will also change the way the raycasting works.
	 */
	raycastParams: RaycastParams;

	/**
	 * Turns on or off the part visualizer for the raycasts.
	 * Highly recommended to leave it off for production games or feel the wrath of performance lost.
	 */
	DebugMode(debugRays: boolean): void;

	/**
	 * Defaults to false.
	 *
	 * Turns on or off the individual part tracking for hit detection.
	 * In a nutshell, if this is on,
	 * it will behave like the traditional BasePart.Touched where the OnHit event will fire for every part intersected.
	 */
	PartMode(checkPart?: boolean): void;

	/**
	 * Merges existing Hitbox points with new Vector3 values relative to the part position.
	 * Automatically caches the results to the hitbox (meaning you don't need to reinitialize the hitbox for it to take effect).
	 *
	 * This part can be a descendent of your original Hitbox model or can be an entirely different instance
	 * that is not related to the hitbox(example: Have a weapon with attachments and you can then add in more
	 * vector3 points without instancing new attachments, great for dynamic hitboxes).
	 *
	 * @param groupName When specified, if these points hit something,
	 * OnHit will return the same groupName parameter,
	 * allowing you to do different things depending on where your weapons hit.
	 */
	SetPoints(part: BasePart, vector3Points: Vector3[], groupName?: string): void;

	/**
	 * Removes the given Vector3 values provided the part was the same as the ones you set in SetPoints.
	 */
	RemovePoints(part: BasePart, vector3Points: Vector3[]): void;

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
